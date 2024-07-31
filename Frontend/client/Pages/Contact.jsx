
import Layout from '../Component/Layout'

const Contact = () => {
    return (
        <>
            <Layout title={'Contact-Ecommerce App'}>
                <div className='container-fluid contact'>
                    <div className='image-container col-sm-6'>
                        <img src="\imag1.jpg" alt="error loading image" />
                    </div>
                    <div className='text-container col-sm-6'>
                        <h2>Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                        <p>Email: support@kinbech.com</p>
                        <p>Phone: +123-456-7890</p>

                        <p>Thank you for shopping with KinBech!</p>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Contact