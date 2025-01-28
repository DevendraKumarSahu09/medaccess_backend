// import React, { useState } from 'react';
// import './HospitalSignUp.css';
// import Carousel from '../../components/Carousal/Carousal';

// const HospitalSignUp = () => {
//     const [formData, setFormData] = useState({
//         hospitalName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         contact: '',
//         streetAddress: '',
//         city: '',
//         zipCode: '',
//         registrationNumber: '',
//         state: '',
//         departmentalServices: '',
//         profilePhoto: null,
//         websiteUrl: '',
//     });

//     const [error, setError] = useState(null); // To handle errors
//     const [isLoading, setIsLoading] = useState(false); // To show loading state

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//     };

//     const handleFileChange = (event) => {
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             profilePhoto: event.target.files[0],
//         }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         // Check if passwords match
//         if (formData.password !== formData.confirmPassword) {
//             alert("Passwords do not match!");
//             return;
//         }

//         // Prepare the address object
//         const address = {
//             zipCode: formData.zipCode,
//             state: formData.state,
//             city: formData.city,
//             street: formData.streetAddress,
//         };

//         // Prepare FormData for API request
//         const hospitalFormData = new FormData();

//         // Append all non-address fields to FormData
//         for (let key in formData) {
//             if (key !== 'zipCode' && key !== 'state' && key !== 'city' && key !== 'streetAddress') {
//                 hospitalFormData.append(key, formData[key]);
//             }
//         }

//         // Append the address object to FormData (stringified)
//         hospitalFormData.append('address', JSON.stringify(address));

//         // Log FormData content to verify its structure
//         for (let pair of hospitalFormData.entries()) {
//             console.log(pair[0], pair[1]);
//         }

//         try {
//             setIsLoading(true);
//             const response = await fetch('http://localhost:5000/api/auth/hospital/register', {
//                 method: 'POST',
//                 body: hospitalFormData,
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 alert('Registration successful');
//                 // Redirect to login or dashboard if needed
//             } else {
//                 setError(result.message || 'Registration failed');
//             }
//         } catch (error) {
//             console.log('front: ', error);
//             setError('Something went wrong. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <>

//             <form onSubmit={handleSubmit} className="hospital-signup-form">
//                 <h2 className="form-title">Hospital Registration Form</h2>

//                 {error && <p className="error">{error}</p>}

//                 <div className="form-group">
//                     <label htmlFor="hospitalName" className="form-label">Hospital Name:</label>
//                     <input
//                         type="text"
//                         id="hospitalName"
//                         name="hospitalName"
//                         className="form-input"
//                         value={formData.hospitalName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="email" className="form-label">Email ID:</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         className="form-input"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="password" className="form-label">Create Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         className="form-input"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
//                     <input
//                         type="password"
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         className="form-input"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="contact" className="form-label">Contact Number:</label>
//                     <input
//                         type="text"
//                         id="contact"
//                         name="contact"
//                         className="form-input"
//                         value={formData.contact}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="streetAddress" className="form-label">Street Address:</label>
//                     <input
//                         type="text"
//                         id="streetAddress"
//                         name="streetAddress"
//                         className="form-input"
//                         value={formData.streetAddress}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="city" className="form-label">City:</label>
//                     <input
//                         type="text"
//                         id="city"
//                         name="city"
//                         className="form-input"
//                         value={formData.city}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="zipCode" className="form-label">Zip Code:</label>
//                     <input
//                         type="text"
//                         id="zipCode"
//                         name="zipCode"
//                         className="form-input"
//                         value={formData.zipCode}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="registrationNumber" className="form-label">Hospital Registration Number:</label>
//                     <input
//                         type="text"
//                         id="registrationNumber"
//                         name="registrationNumber"
//                         className="form-input"
//                         value={formData.registrationNumber}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="state" className="form-label">State:</label>
//                     <input
//                         type="text"
//                         id="state"
//                         name="state"
//                         className="form-input"
//                         value={formData.state}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="departmentalServices" className="form-label">Departmental Services & Facilities:</label>
//                     <textarea
//                         id="departmentalServices"
//                         name="departmentalServices"
//                         className="form-textarea"
//                         value={formData.departmentalServices}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="profilePhoto" className="form-label">Upload Photo for Profile:</label>
//                     <input
//                         type="file"
//                         id="profilePhoto"
//                         name="profilePhoto"
//                         className="form-input"
//                         onChange={handleFileChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="websiteUrl" className="form-label">Website URL (if available):</label>
//                     <input
//                         type="url"
//                         id="websiteUrl"
//                         name="websiteUrl"
//                         className="form-input"
//                         value={formData.websiteUrl}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <button type="submit" className="submit-btn" disabled={isLoading}>
//                     {isLoading ? 'Registering...' : 'Register'}
//                 </button>
//             </form>
//         </>

//     );
// };

// export default HospitalSignUp;


import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Hospital, Mail, Phone, MapPin, Globe, FileText, Camera } from 'lucide-react';

const HospitalSignUp = () => {
    const [formData, setFormData] = useState({
        hospitalName: '',
        email: '',
        password: '',
        confirmPassword: '',
        contact: '',
        streetAddress: '',
        city: '',
        zipCode: '',
        registrationNumber: '',
        state: '',
        departmentalServices: '',
        profilePhoto: null,
        websiteUrl: '',
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event) => {
        setFormData(prev => ({ ...prev, profilePhoto: event.target.files[0] }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Prepare the address object
        const address = {
            zipCode: formData.zipCode,
            state: formData.state,
            city: formData.city,
            street: formData.streetAddress,
        };

        // Prepare FormData for API request
        const hospitalFormData = new FormData();

        // Append all non-address fields to FormData
        for (let key in formData) {
            if (key !== 'zipCode' && key !== 'state' && key !== 'city' && key !== 'streetAddress') {
                hospitalFormData.append(key, formData[key]);
            }
        }

        // Append the address object to FormData (stringified)
        hospitalFormData.append('address', JSON.stringify(address));

        // Log FormData content to verify its structure
        for (let pair of hospitalFormData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5000/api/auth/hospital/register', {
                method: 'POST',
                body: hospitalFormData,
            });

            const result = await response.json();
            if (response.ok) {
                alert('Registration successful');
                // Redirect to login or dashboard if needed
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch (error) {
            console.log('front: ', error);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
                <CardHeader>
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Hospital Registration</h2>
                    <p className="text-center text-gray-600 mb-8">Please fill in the details to register your hospital</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-group">
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                    <Hospital className="w-4 h-4 mr-2" />
                                    Hospital Name
                                </label>
                                <input
                                    type="text"
                                    name="hospitalName"
                                    value={formData.hospitalName}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Contact Number
                                </label>
                                <input
                                    type="text"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Registration Number
                                </label>
                                <input
                                    type="text"
                                    name="registrationNumber"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-group">
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        Street Address
                                    </label>
                                    <input
                                        type="text"
                                        name="streetAddress"
                                        value={formData.streetAddress}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                        Zip Code
                                    </label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>

                            <div className="space-y-6">
                                <div className="form-group">
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                        Departmental Services & Facilities
                                    </label>
                                    <textarea
                                        name="departmentalServices"
                                        value={formData.departmentalServices}
                                        onChange={handleChange}
                                        className="form-textarea"
                                        rows="4"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-group">
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                            <Camera className="w-4 h-4 mr-2" />
                                            Profile Photo
                                        </label>
                                        <input
                                            type="file"
                                            name="profilePhoto"
                                            onChange={handleFileChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                            <Globe className="w-4 h-4 mr-2" />
                                            Website URL
                                        </label>
                                        <input
                                            type="url"
                                            name="websiteUrl"
                                            value={formData.websiteUrl}
                                            onChange={handleChange}
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center mt-8">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                {isLoading ? 'Registering...' : 'Complete Registration'}
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default HospitalSignUp;
