const home = () => {
    const body = document.querySelector('body');
    body.style.backgroundImage = "url('/BLogoLS.png')";
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundSize = "100%";
    body.style.backgroundAttachment = 'fixed';
};

export default home;