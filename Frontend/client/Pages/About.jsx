
import Layout from '../Component/Layout'

const About = () => {
  return (
    <Layout>
      <div className='container-fluid contact'>
        <div className='Aboutimage-container col-sm-6'>
          <img src="\imag1.jpg" alt="error loading image" />
        </div>
        <div className='AboutText-container col-sm-6'>
          <h1>About Us</h1>
          <h4>Welcome to KinBech</h4>
          <p className='text-justified'> Your Ultimate Online Marketplace

            Discover the convenience and excitement of online shopping at KinBech, where we bring you a wide array of products to meet all your needs. Whether you're looking for the latest electronics, trendy fashion, home essentials, or unique gifts, KinBech has it all. Our mission is to provide a seamless shopping experience that combines quality, affordability, and reliability.

            <p>Why Choose KinBech?</p>
            <span>
            Vast Product Range: From everyday necessities to special treats, our diverse product selection ensures that you find exactly what you're looking for. Browse through categories like electronics, clothing, home and kitchen, beauty and health, and much more.</span><br/>

<span> Quality Assurance: We partner with trusted sellers and brands to bring you top-quality products. Each item on KinBech is thoroughly vetted to ensure it meets our high standards.</span><br/>
           

        

           <span>Join the KinBech Community</span> <br/>

            Become a part of the KinBech community and enjoy a shopping experience like no other. Sign up today to receive updates on the latest products, special offers, and exclusive promotions. Follow us on social media to stay connected and be the first to know about our exciting events and sales.

            Start Shopping Now

            Ready to experience the best in online shopping? Visit KinBech today and explore a world of amazing products at your fingertips. Happy shopping!</p>
          <p>Mail us at:xyz@email.com</p>
          <p>contact number:+977 98562355611</p>
        </div>
      </div>
    </Layout>
  );
}

export default About