import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Business.css'
import AllCards from '../../components/AllCards/AllCards'



export default function business() {
    const auth = useContext(AuthContext)
    return (
        <div className='business page'>
            {
                (auth?.userDetails?.isBusiness) ?
                    <>
                        <p>welcome!</p>
                        <AllCards />

                    </>
                    :
                    <>
                        <p>not a business</p>
                    </>
            }
        </div>
    )
}
