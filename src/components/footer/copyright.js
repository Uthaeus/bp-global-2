function Copyright() {
    let year = new Date().getFullYear();

    return (
        <div className='copyright-wrapper'>
            <p className='copyright'>
                &copy; {year} All Rights Reserved <span className='copyright-title'>BP Global, LLC</span>
            </p>
        </div>
    );
}

export default Copyright;