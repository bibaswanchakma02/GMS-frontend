
// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../../config/axiosconfig';
// import './viewallmemberships.scss';
// import Loader from '../loader/loader';

// const ViewAllMemberships = () => {
//     const [memberships, setMemberships] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchMemberships = async () => {
//             try {
//                 const response = await axiosInstance.get('/membership/getall');
//                 setMemberships(response.data);
//             } catch (error) {
//                 console.error('Error fetching memberships:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMemberships();
//     }, []);

//     if (loading) {
//         return <Loader />;
//     }

//     return (
//         <div className="view-all-memberships-container">
//             {memberships.length === 0 ? (
//                 <p>No memberships available.</p>
//             ) : (
//                 <div className="view-all-memberships-cards">
//                     {memberships.map((membership) => (
//                         <div className="view-all-memberships-card" key={membership.packageId}>
//                             <div className="view-all-memberships-highlight">
//                                 <h3 className="view-all-memberships-package-name">{membership.packageName}</h3>
//                                 <p className="view-all-memberships-price">₹ {membership.price}</p>
//                                 <p className="view-all-memberships-duration">{membership.duration} days</p>
//                             </div>
//                             <div className="view-all-memberships-benefits">
//                                 <div className="view-all-memberships-details">
//                                     <h4>Benefits</h4>
//                                     <ul>
//                                         {membership.benefits.accessToAllFacilities && (
//                                             <li>Access to All Facilities</li>
//                                         )}
//                                         {membership.benefits.freePersonalTrainerSessions > 0 && (
//                                             <li>{membership.benefits.freePersonalTrainerSessions} Free Personal Trainer Sessions</li>
//                                         )}
//                                         {membership.benefits.freeGroupClasses && (
//                                             <li>Free Group Classes</li>
//                                         )}
//                                         {membership.benefits.nutritionPlan && (
//                                             <li>Nutrition Plan</li>
//                                         )}
//                                         {membership.benefits.guestPasses > 0 && (
//                                             <li>{membership.benefits.guestPasses} Guest Passes</li>
//                                         )}
//                                         {membership.benefits.merchandiseDiscount > 0 && (
//                                             <li>{membership.benefits.merchandiseDiscount}% Merchandise Discount</li>
//                                         )}
//                                         {membership.benefits.lockerServices && (
//                                             <li>Locker Services</li>
//                                         )}
//                                         {membership.benefits.parking && (
//                                             <li>Parking</li>
//                                         )}
//                                         {/* {membership.benefits.other && (
//                                             <li>{membership.benefits.other}</li>
//                                         )} */}
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };



import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosconfig';
import './viewallmemberships.scss';
import Loader from '../loader/loader';
import { useAuth } from '../../context/AuthContext';


const ViewAllMemberships = ({ isRenewal }) => {
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);
    const { auth } = useAuth(); 

    useEffect(() => {
        const fetchMemberships = async () => {
            try {
                const response = await axiosInstance.get('/membership/getall');
                setMemberships(response.data);
            } catch (error) {
                console.error('Error fetching memberships:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMemberships();
    }, []);

    const handleRenewMembership = async (packageName) => {
        try {
            const response = await axiosInstance.post('/membership/renew', null, {
                params: { packageName }
            });

            const{orderId, amount} = response.data;

            const options = {
                key: 'rzp_test_6ItazI6qA8JhM2', 
                amount: amount, 
                currency: 'INR',
                name: 'GMS',
                description: 'Renew Membership',
                order_id: orderId,
                handler: async (response) => {
                    console.log(response)
                    try {
                        // Verify payment

                        const verificationResponse = await axiosInstance.post('/membership/verifyPayment', null, {
                            params: {
                                paymentId: response.razorpay_payment_id,
                                packageName: packageName
                            }
                        });

                        alert('Membership renewed successfully!');
                        console.log(verificationResponse.data);
                    } catch (error) {
                        console.error('Payment verification failed:', error);
                        alert('Failed to verify payment.');
                    }
                },
                prefill: {
                    name: 'Your Name',
                    email: 'your-email@example.com',
                    contact: '9999999999'
                },
                theme: {
                    color: '#3399cc'
                }
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

           
        } catch (error) {
            console.error('Error renewing membership:', error);
            alert('Failed to renew membership.');
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="view-all-memberships-container">
            {memberships.length === 0 ? (
                <p>No memberships available.</p>
            ) : (
                <div className="view-all-memberships-cards">
                    {memberships.map((membership) => (
                        <div
                            className="view-all-memberships-card"
                            key={membership.packageId}
                            onClick={() => isRenewal && auth.role === 'USER' && handleRenewMembership(membership.packageName)}
                            style={{ cursor: (isRenewal && auth.role === 'USER') ? 'pointer' : 'default', opacity: (isRenewal && auth.role === 'USER') ? 1 : 0.7 }}
                        >
                            <div className="view-all-memberships-highlight">
                                <h3 className="view-all-memberships-package-name">{membership.packageName}</h3>
                                <p className="view-all-memberships-price">₹ {membership.price}</p>
                                <p className="view-all-memberships-duration">{membership.duration} days</p>
                            </div>
                            <div className="view-all-memberships-benefits">
                                <div className="view-all-memberships-details">
                                    <h4>Benefits</h4>
                                    <ul>
                                        {membership.benefits.accessToAllFacilities && (
                                            <li>Access to All Facilities</li>
                                        )}
                                        {membership.benefits.freePersonalTrainerSessions > 0 && (
                                            <li>{membership.benefits.freePersonalTrainerSessions} Free Personal Trainer Sessions</li>
                                        )}
                                        {membership.benefits.freeGroupClasses && (
                                            <li>Free Group Classes</li>
                                        )}
                                        {membership.benefits.nutritionPlan && (
                                            <li>Nutrition Plan</li>
                                        )}
                                        {membership.benefits.guestPasses > 0 && (
                                            <li>{membership.benefits.guestPasses} Guest Passes</li>
                                        )}
                                        {membership.benefits.merchandiseDiscount > 0 && (
                                            <li>{membership.benefits.merchandiseDiscount}% Merchandise Discount</li>
                                        )}
                                        {membership.benefits.lockerServices && (
                                            <li>Locker Services</li>
                                        )}
                                        {membership.benefits.parking && (
                                            <li>Parking</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewAllMemberships;

