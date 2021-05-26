function Success() {

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
        <p>We received your purchase request;<br/> we'll be in touch shortly!</p>
      </div>
</div>
    );
  };

export default Success;