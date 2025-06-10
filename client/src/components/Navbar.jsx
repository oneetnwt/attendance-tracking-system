import Logo from '../assets/SBOLogo.png'

function Navbar() {
    return (
        <div className='w-full flex gap-3 items-center'>
            <img src={Logo} alt="SBO Logo" className='w-15' />
            <div>
                <h3 className='text-xl font-bold'>College of Technologies</h3>
                <p className='font-medium'>Student Body Organization</p>
            </div>
        </div>
    )
}

export default Navbar