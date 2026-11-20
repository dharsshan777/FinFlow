import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
import { MdOutlineArrowRightAlt } from "react-icons/md";

export default function Hero() {
  return (
    <div>

        <section className='mt-4 hero-section'>

            <div className='container-fluid'>

                <div className='row '>


                    <div className='col-12 col-md-6  mt-5 hero-cont'>

                       {/* welcome heading */}
                        <h4 className='hero-1'>Welcome to FinFlow</h4>


                       {/* your money  heading */}
                        <h1 className='mon mt-5 '>Your Money has</h1>
                        <h1 className='fut'>More Potential.</h1>


                        <p className='hero-para mt-3'>Take control of your money with smarter
                        spending and better financial habits. Spend
                        smarter today, build a better tomorrow.
                        </p>
                        
                        
                        <Link to="/signup" className="btn start2 mt-5">Get Started Free < MdOutlineArrowRightAlt /></Link>
                       
</div>




                    <div className='col-12 col-md-6 hero-img mt-3'>

                        <img src='/images/herosection-img.png' className='hero-img1' style={{backgroundColor:'#F4F9FF'}}
                        alt='Hero-img'
                        width='100%'
                        height='550px'>
                        
                        </img>

                    </div>




                </div>




            </div>

        </section>
      
    </div>
  )
}
