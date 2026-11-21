
import React from 'react';
import './About.css';

import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

import {
    FiTarget,
    FiTrendingUp,
    FiDollarSign,
   
} from 'react-icons/fi';



export default function About() {

    const services = [
        {
            icon: <FiDollarSign />,
            title: 'Expense Tracking',
            description: 'Track your daily expenses and understand where your money goes.'
        },
        {
            icon: <FiTarget />,
            title: 'Budget Planning',
            description: 'Create monthly budgets and manage your spending wisely.'
        },
        {
            icon: <FiTrendingUp />,
            title: 'Financial Insights',
            description: 'Understand your spending habits and make smarter decisions.'
        }
    ];

  

    return (
        <>
            <Navbar />

            {/* About Hero */}
            <section className="about-hero">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-md-6">
                            <h1>
                                About <span>FinFlow</span>
                            </h1>

                            <p>
                                Take control of your money and build better
                                financial habits with FinFlow. We make managing
                                your personal finances simple and organized.
                            </p>
                        </div>

                        <div className="col-md-6 text-center">
                            <img
                                src="/images/herosection-img.png"
                                alt="About FinFlow"
                                className="img-fluid about-hero-img"
                            />
                        </div>

                    </div>
                </div>
            </section>

          

            {/* What We Do */}
            <section className="about-services">
                <div className="container">

                    <div className="about-section-heading">
                        <h2>What We Do</h2>
                        <p>
                            We provide simple tools to help you manage your money better.
                        </p>
                    </div>

                    <div className="row g-4">

                        {services.map((service, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="service-card">

                                    <div className="service-icon">
                                        {service.icon}
                                    </div>

                                    <h4>{service.title}</h4>

                                    <p>{service.description}</p>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* Mission and Vision */}
            <section className="about-mission">
                <div className="container">

                    <div className="about-section-heading">
                        <h2>Our Mission & Vision</h2>
                        <p>
                            What inspires us and where we want to go.
                        </p>
                    </div>

                    <div className="row g-4">

                        <div className="col-md-6">
                            <div className="mission-card">

                                <div className="mission-icon">
                                    <FiTarget />
                                </div>

                                <h3>Our Mission</h3>

                                <p>
                                    To make money management simple and help
                                    students build better financial habits.
                                </p>

                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mission-card">

                                <div className="mission-icon">
                                    <FiTrendingUp />
                                </div>

                                <h3>Our Vision</h3>

                                <p>
                                    To empower everyone to make smarter
                                    financial decisions and achieve
                                    financial stability.
                                </p>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

    

            <Footer />
        </>
    );
}
