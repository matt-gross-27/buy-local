function FormSuccess() {

    setTimeout(() => {
      window.location.assign("/")
    }, 3000);

    return (
<div className="success">
    <div className="success-card">
        <div className= "checkmarkDiv">
        <i className="checkmark">✓</i>
      </div>
        <h1>Success</h1> 
        <p>"Thanks for your Email! 😀"</p>
      </div>
</div>
    );
  };

export default FormSuccess;