import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

import Sidebar from '../component/Sidebar';
import DashboardHeader from '../component/DashboardHeader';
import { TbLogout } from "react-icons/tb";

import {
    FiSettings,
    FiUser,
    FiEdit2,
    FiMail,
    FiBell,


} from 'react-icons/fi';

export default function Settings() {

    const navigate = useNavigate();

    const loggedUser = JSON.parse(
        localStorage.getItem('loggedUser') || 'null'
    );

    const profile = loggedUser?.email
        ? JSON.parse(
            localStorage.getItem(
                `userProfile_${loggedUser.email}`
            ) || '{}'
        )
        : {};

    const firstName = profile.Firstname || profile.firstName || '';
    const lastName = profile.Lastname || profile.lastName || '';

    const notificationStorageKey = loggedUser?.email
        ? `notificationPreferences_${loggedUser.email}`
        : null;

    const [notifications, setNotifications] = useState(() => {

        if (notificationStorageKey) {

            try {
                return {
                    budgetAlerts: true,
                    savingsReminders: true,
                    weeklySummary: false,
                    ...JSON.parse(
                        localStorage.getItem(notificationStorageKey) || '{}'
                    )
                };
            } catch {
                // Use default preferences
            }
        }

        return {
            budgetAlerts: true,
            savingsReminders: true,
            weeklySummary: false
        };
    });

    useEffect(() => {

        if (notificationStorageKey) {
            localStorage.setItem(
                notificationStorageKey,
                JSON.stringify(notifications)
            );
        }

    }, [notifications, notificationStorageKey]);


    // Handle Notification Toggle
    const handleNotificationChange = async (name) => {

        if (name === 'savingsReminders' && !notifications.savingsReminders) {

            if (!('Notification' in window)) {
                alert('Your browser does not support notifications.');
                return;
            }

            let permission = Notification.permission;

            if (permission === 'default') {
                permission = await Notification.requestPermission();
            }

            if (permission !== 'granted') {
                alert('Please allow browser notifications to enable Savings Reminders.');
                return;
            }
        }

        setNotifications(previous => ({
            ...previous,
            [name]: !previous[name]
        }));

    };


    // logut functionalities

    const handleLogout = () => {
        localStorage.removeItem('loggedUser');
        navigate("/signin", { replace: true });
    }


    return (
        <>
            <Sidebar />

            <DashboardHeader />

            <div className="settings-page">

                {/* Page Header */}
                <div className="settings-page-header">

                    <div className="settings-header-icon">
                        <FiSettings />
                    </div>

                    <div>
                        <h2 >Settings</h2>
                        <p>Manage your account and preferences.</p>
                    </div>

                </div>


                {/* ACCOUNT SETTINGS */}
                <div className="settings-account-card">

                    <div className="settings-section-heading">
                        <FiUser />
                        <h3>Account Settings</h3>
                    </div>

                    <div className="settings-account-details">

                        <div className="settings-field">
                            <label>First Name</label>

                            <div className="settings-input">
                                {firstName || 'Not available'}
                            </div>
                        </div>

                        <div className="settings-field">
                            <label>Last Name</label>

                            <div className="settings-input">
                                {lastName || 'Not available'}
                            </div>
                        </div>

                        <div className="settings-field settings-email-field">
                            <label>
                                <FiMail /> Email Address
                            </label>

                            <div className="settings-input">
                                {loggedUser?.email || 'Not available'}
                            </div>
                        </div>

                    </div>

                    <button
                        className="settings-edit-btn"
                        onClick={() => navigate('/profile')}
                    >
                        <FiEdit2 />
                        Edit Profile
                    </button>

                </div>


                {/* NOTIFICATION SETTINGS */}
                <div className="settings-notification-card">

                    <div className="settings-section-heading">
                        <FiBell />
                        <h3>Notification Settings</h3>
                    </div>




                    {/* Budget Alerts */}
                    <div className="notification-option">

                        <div className="notification-info">
                            <h4>Budget Alerts</h4>

                            <p>
                                Get notified when your expenses reach your budget limit.
                            </p>
                        </div>

                        <button
                            type="button"
                            className={`notification-toggle ${notifications.budgetAlerts ? 'active' : ''}`}
                            role="switch"
                            aria-checked={notifications.budgetAlerts}
                            onClick={() => handleNotificationChange('budgetAlerts')}
                        >
                            <span></span>
                        </button>

                    </div>


                    {/* Savings Reminders */}
                    <div className="notification-option">

                        <div className="notification-info">
                            <h4>Savings Reminders</h4>

                            <p>
                                Receive reminders about your monthly savings target.
                            </p>
                        </div>

                        <button
                            type="button"
                            className={`notification-toggle ${notifications.savingsReminders ? 'active' : ''}`}
                            role="switch"
                            aria-checked={notifications.savingsReminders}
                            onClick={() => handleNotificationChange('savingsReminders')}
                        >
                            <span></span>
                        </button>

                    </div>


                    {/* Weekly Summary */}
                    <div className="notification-option">

                        <div className="notification-info">
                            <h4>Weekly Expense Summary</h4>

                            <p>
                                Get a summary of your weekly income and expenses.
                            </p>
                        </div>

                        <button
                            type="button"
                            className={`notification-toggle ${notifications.weeklySummary ? 'active' : ''}`}
                            role="switch"
                            aria-checked={notifications.weeklySummary}
                            onClick={() => handleNotificationChange('weeklySummary')}
                        >
                            <span></span>
                        </button>

                    </div>



                </div>


                <div className='log-but'>
                    <button
                        type='button'
                        className='logout-item'
                        onClick={handleLogout}>
                        <TbLogout />
                        <span>Logout</span>

                    </button>
                </div>

            </div>



        </>
    );
}