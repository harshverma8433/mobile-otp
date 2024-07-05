
import {useState} from 'react'

const PhoneNumber = () => {

    const [phonenumber , setPhoneNumber] = useState('');

    console.log("pn" , phonenumber);

  return (
    <div className='flex flex-col'>
        <div className='space-x-4 flex'>
        <input value={phonenumber} onChange={(event) => setPhoneNumber(event.target.value)} placeholder='Enter a Phone Number...' type="number" className='w-80 h-9 rounded-xl focus:outline-0 px-2 text-lg'   />
        <button className='bg-slate-600 rounded-xl h-9 w-24 text-white font-mono'>Send OTP</button>
    </div>
        {
            (phonenumber.length>0 &&phonenumber.length<10) && <h1 className='text-red-600 pl-1 pt-1'>Invalid Phone Number</h1>
        }
    </div>
  )
}

export default PhoneNumber