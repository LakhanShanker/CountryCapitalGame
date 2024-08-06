import React, { useEffect, useState } from 'react'
import SingleTile from './SingleTile';

function Country() {
    const API = 'https://restcountries.com/v3.1/all';
    const [country, setCountry] = useState([]);
    const [capital, setCapital] = useState([]);
    const [name, setName] = useState([]);
    const [selectCountry, setSelectCountry] = useState(null);
    const [selectCapital, setSelectCapital] = useState(null);
    const [selectCountryName, setSelectCountryName] = useState(null);
    const [selectCapitalName, setSelectCapitalName] = useState(null);
    const [score, setScore] = useState([]);
    const handleSelectCapital = (i) => {
        setSelectCapital(i);
        setSelectCapitalName(capital[i]);
    }
    const shuffleArray = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };
    const handleSelectCountry = (i) => {
        setSelectCountry(i);
        setSelectCountryName(country[i]);
    }

    const getCountryFromAPI = async () => {
        const data = await fetch(API, {
            mode: 'cors',
        });
        const item = await data.json();

        const newCountry = item.map(x => x?.name?.common);
        const newCapital = item.map(x => x.capital?.[0]);
        const shuffledCapitals = shuffleArray(newCapital);
        const shuffledCountry = shuffleArray(newCountry);
        setCapital(shuffledCapitals);
        setCountry(shuffledCountry);
        item.forEach(x => {
            const country = x?.name?.common;
            const capital = x?.capital?.[0];
            setName(prev => [...prev, {
                country,
                capital
            }]);
        });
    }

    useEffect(() => {
        getCountryFromAPI();
    }, []);

    useEffect(() => {
        if (selectCapitalName && selectCountryName) {
            const newData = name.filter(data => data.country === selectCountryName && data.capital === selectCapitalName);
            if (newData && newData.length) {
                const data = {
                    country: selectCountryName,
                    capital: selectCapitalName
                }
                const hasCountryAlready = score.filter(x => x.country === selectCountryName);
                if (hasCountryAlready && hasCountryAlready.length === 0)
                    setScore(prev => [...prev, data]);
                alert('Congrats, You found it right')
            }
        }
        // eslint-disable-next-line
    }, [selectCapitalName, selectCountryName]);

    return (
        <div style={{ display: 'flex', gap: '40px' }}>
            <div>Country :
                <div style={{ display: 'flex', flexDirection: 'column', width: '200px', marginTop: '30px' }}>{
                    country && country.map((x, idx) => {
                        return <SingleTile country={x} index={idx} key={idx} handleSelect={handleSelectCountry} select={selectCountry} />
                    })
                }</div>
            </div>
            <div>Capital :
                <div style={{ display: 'flex', flexDirection: 'column', width: '200px', marginTop: '30px' }}>{
                    capital && capital.map((x, idx) => {
                        return <SingleTile country={x} index={idx} key={idx} handleSelect={handleSelectCapital} select={selectCapital} />
                    })
                }</div>
            </div>
            <div>
                <div>Your Correct Countries : </div>
                {
                    score?.map((data, idx) => {
                        return <div key={idx} style={{ display: 'flex', flexDirection: 'column', width: '200px', marginTop: '30px' }}>{data.country}</div>
                    })
                }
            </div>
        </div>
    )
}

export default Country