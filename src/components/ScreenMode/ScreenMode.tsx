import { Button, Navbar } from 'react-bootstrap'
import './ScreenMode.css'
import { BsMoonStars, BsSun } from 'react-icons/bs'
import { useEffect, useState } from 'react';

const elmDoc = document.querySelector('html') as HTMLElement

export default function ScreenMode() {

    const [isDarkMode, SetIsDarkMode] = useState(false)

    useEffect(() => {
        const darkMode = localStorage.getItem('darkMode');

        if (darkMode) {
            elmDoc?.setAttribute('data-bs-theme', darkMode === 'true' ? 'dark' : 'light')
            SetIsDarkMode(darkMode === 'true' ? true : false)
        } else {
            localStorage.setItem('darkMode', 'false')
            elmDoc?.setAttribute('data-bs-theme', 'light')
            SetIsDarkMode(false)
        }
    }, []);

    const toggleScreenMode = () => {
        elmDoc?.setAttribute('data-bs-theme', !isDarkMode ? 'dark' : 'light')
        localStorage.setItem('darkMode', (!isDarkMode).toString())
        SetIsDarkMode(!isDarkMode)
    }

    return (
        <Navbar.Collapse className="justify-content-end">
            <Button variant={isDarkMode ? 'dark' : 'light'} className='ScreenMode' onClick={toggleScreenMode} >
                {
                    (isDarkMode) ?
                        <BsSun />
                        :
                        <BsMoonStars />
                }
            </Button >
        </Navbar.Collapse>
    )
}


