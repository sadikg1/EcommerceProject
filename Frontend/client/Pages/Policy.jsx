
import Layout from '../Component/Layout'

const Policy = () => {
  return (
    <Layout>
      <div className='container-fluid contact'>
        <div className='policyimage-container col-sm-6'>
          <img src="\imag1.jpg" alt="error loading image" height={"600px"} width="700px"/>
        </div>
        <div className='policy-container col-sm-6'>
        
        <h1>Privacy Policy</h1>
        <p>Effective Date: May 20, 2024</p>

        <p>At KinBech, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information when you visit and make a purchase from our website.</p>

        <h2>1. Information We Collect</h2>
        <p>We collect various types of information in connection with the services we provide, including:</p>
        <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, billing address, payment information.</li>
            <li><strong>Non-Personal Information:</strong> Browser type, IP address, the pages you visit on our site, and the time and date of your visits.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect for various purposes, including:</p>
        <ul>
            <li>Processing and fulfilling your orders.</li>
            <li>Improving our website and services.</li>
            <li>Communicating with you about your orders, products, services, and promotional offers.</li>
            <li>Enhancing your shopping experience.</li>
            <li>Protecting the security and integrity of our website.</li>
        </ul>

       

       

        

        <p>Thank you for shopping with KinBech!</p>
   
        </div>
      </div>
    </Layout>
  );
}

export default Policy