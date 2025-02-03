// import React, { useState } from 'react';
// import './DoctorSignUp.css';

// const DoctorSignUp = () => {
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         licenseNumber: '',
//         clinicName: '',
//         streetAddress: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         specialization: '',
//         experience: '',
//         daysAvailable: '',
//         clinicTimings: '',
//         aboutYourself: '',
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


//         // Prepare the clinicAddress object
//         const clinicAddress = {
//             zipCode: formData.zipCode,
//             state: formData.state,
//             city: formData.city,
//             street: formData.streetAddress,
//         };

//         // Prepare form data for API request
//         const doctorFormData = new FormData();

//         // Append all non-address fields to FormData
//         for (let key in formData) {
//             if (key !== 'zipCode' && key !== 'state' && key !== 'city' && key !== 'streetAddress'){
//                 doctorFormData.append(key, formData[key]);
//             }
//         }

//         // Append the address object to FormData (stringified)
//         doctorFormData.append('clinicAddress', JSON.stringify(clinicAddress));

//         // Log FormData content to verify its structure
//         for (let pair of doctorFormData.entries()) {
//             console.log(pair[0], pair[1]);
//         }

//         try {
//             setIsLoading(true);
//             const response = await fetch('http://localhost:5000/api/auth/doctor/register', {
//                 method: 'POST',
//                 body: doctorFormData,
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 alert('Registration successful');
//                 // Redirect to login or dashboard if needed
//             } else {
//                 setError(result.message || 'Registration failed');
//             }
//         } catch (error) {
//             setError('Something went wrong. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="doctor-signup-form">
//             <h2 className="form-title">Doctor Registration Form</h2>

//             {error && <p className="error">{error}</p>}

//             <div className="form-group">
//                 <label htmlFor="fullName" className="form-label">Full Name:</label>
//                 <input
//                     type="text"
//                     id="fullName"
//                     name="fullName"
//                     className="form-input"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="email" className="form-label">Email Address:</label>
//                 <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     className="form-input"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="password" className="form-label">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     className="form-input"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
//                 <input
//                     type="password"
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     className="form-input"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="licenseNumber" className="form-label">License Number:</label>
//                 <input
//                     type="text"
//                     id="licenseNumber"
//                     name="licenseNumber"
//                     className="form-input"
//                     value={formData.licenseNumber}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="clinicName" className="form-label">Clinic Name:</label>
//                 <input
//                     type="text"
//                     id="clinicName"
//                     name="clinicName"
//                     className="form-input"
//                     value={formData.clinicName}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="streetAddress" className="form-label">Street Address:</label>
//                 <input
//                     type="text"
//                     id="streetAddress"
//                     name="streetAddress"
//                     className="form-input"
//                     value={formData.streetAddress}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="city" className="form-label">City:</label>
//                 <input
//                     type="text"
//                     id="city"
//                     name="city"
//                     className="form-input"
//                     value={formData.city}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="state" className="form-label">State:</label>
//                 <input
//                     type="text"
//                     id="state"
//                     name="state"
//                     className="form-input"
//                     value={formData.state}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="zipCode" className="form-label">Zip Code:</label>
//                 <input
//                     type="text"
//                     id="zipCode"
//                     name="zipCode"
//                     className="form-input"
//                     value={formData.zipCode}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="specialization" className="form-label">Specialization:</label>
//                 <input
//                     type="text"
//                     id="specialization"
//                     name="specialization"
//                     className="form-input"
//                     value={formData.specialization}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="experience" className="form-label">Years of Experience:</label>
//                 <input
//                     type="number"
//                     id="experience"
//                     name="experience"
//                     className="form-input"
//                     value={formData.experience}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="daysAvailable" className="form-label">Days Available:</label>
//                 <input
//                     type="text"
//                     id="daysAvailable"
//                     name="daysAvailable"
//                     className="form-input"
//                     value={formData.daysAvailable}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="clinicTimings" className="form-label">Clinic Timings:</label>
//                 <input
//                     type="text"
//                     id="clinicTimings"
//                     name="clinicTimings"
//                     className="form-input"
//                     value={formData.clinicTimings}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="aboutYourself" className="form-label">About Yourself:</label>
//                 <textarea
//                     id="aboutYourself"
//                     name="aboutYourself"
//                     className="form-textarea"
//                     value={formData.aboutYourself}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="profilePhoto" className="form-label">Profile Photo:</label>
//                 <input
//                     type="file"
//                     id="profilePhoto"
//                     name="profilePhoto"
//                     className="form-input"
//                     onChange={handleFileChange}
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="websiteUrl" className="form-label">Website URL:</label>
//                 <input
//                     type="url"
//                     id="websiteUrl"
//                     name="websiteUrl"
//                     className="form-input"
//                     value={formData.websiteUrl}
//                     onChange={handleChange}
//                 />
//             </div>

//             <button type="submit" className="submit-btn" disabled={isLoading}>
//                 {isLoading ? 'Registering...' : 'Register'}
//             </button>
//         </form>
//     );
// };

// export default DoctorSignUp;



// new one


// import React, { useState } from 'react';
// import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
// import "./DoctorSignUp.css";

// const DoctorSignUp = () => {
//     const [currentStep, setCurrentStep] = useState(1);
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         licenseNumber: '',
//         clinicName: '',
//         streetAddress: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         specialization: '',
//         experience: '',
//         daysAvailable: '',
//         clinicTimings: '',
//         aboutYourself: '',
//         profilePhoto: null,
//         websiteUrl: '',
//     });

//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [validationErrors, setValidationErrors] = useState({});

//     const steps = {
//         1: 'Personal Information',
//         2: 'Professional Details',
//         3: 'Clinic Information',
//         4: 'Schedule & About',
//     };

//     const validateStep = (step) => {
//         const errors = {};

//         if (step === 1) {
//             if (!formData.fullName) errors.fullName = 'Full name is required';
//             if (!formData.email) errors.email = 'Email is required';
//             else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
//             if (!formData.password) errors.password = 'Password is required';
//             else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
//             if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
//         }

//         if (step === 2) {
//             if (!formData.licenseNumber) errors.licenseNumber = 'License number is required';
//             if (!formData.specialization) errors.specialization = 'Specialization is required';
//             if (!formData.experience) errors.experience = 'Experience is required';
//         }

//         if (step === 3) {
//             if (!formData.clinicName) errors.clinicName = 'Clinic name is required';
//             if (!formData.streetAddress) errors.streetAddress = 'Street address is required';
//             if (!formData.city) errors.city = 'City is required';
//             if (!formData.state) errors.state = 'State is required';
//             if (!formData.zipCode) errors.zipCode = 'Zip code is required';
//         }

//         setValidationErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));

//         // Clear validation error for the field being changed
//         if (validationErrors[name]) {
//             setValidationErrors(prev => ({
//                 ...prev,
//                 [name]: ''
//             }));
//         }
//     };

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setFormData(prev => ({
//                     ...prev,
//                     profilePhoto: file
//                 }));
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleNext = () => {
//         if (validateStep(currentStep)) {
//             setCurrentStep(prev => Math.min(prev + 1, 4));
//         }
//     };

//     const handlePrevious = () => {
//         setCurrentStep(prev => Math.max(prev - 1, 1));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!validateStep(currentStep)) return;

//         const clinicAddress = {
//             zipCode: formData.zipCode,
//             state: formData.state,
//             city: formData.city,
//             street: formData.streetAddress,
//         };

//         const doctorFormData = new FormData();
//         for (let key in formData) {
//             if (key !== 'zipCode' && key !== 'state' && key !== 'city' && key !== 'streetAddress') {
//                 doctorFormData.append(key, formData[key]);
//             }
//         }
//         doctorFormData.append('clinicAddress', JSON.stringify(clinicAddress));

//         try {
//             setIsLoading(true);
//             const response = await fetch('http://localhost:5000/api/auth/doctor/register', {
//                 method: 'POST',
//                 body: doctorFormData,
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 setError(null);
//                 // Show success message
//                 alert('Registration successful');
//             } else {
//                 setError(result.message || 'Registration failed');
//             }
//         } catch (error) {
//             setError('Something went wrong. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const renderStep1 = () => (
//         <>
//             <div className="form-group">
//                 <label htmlFor="fullName" className="form-label">Full Name</label>
//                 <input
//                     type="text"
//                     id="fullName"
//                     name="fullName"
//                     className={`form-input ${validationErrors.fullName ? 'error-input' : ''}`}
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     placeholder="Dr. John Doe"
//                 />
//                 {validationErrors.fullName && (
//                     <span className="error-message">
//                         <AlertCircle className="inline-block w-4 h-4 mr-1" />
//                         {validationErrors.fullName}
//                     </span>
//                 )}
//             </div>

//             <div className="form-group">
//                 <label htmlFor="email" className="form-label">Email Address</label>
//                 <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     className={`form-input ${validationErrors.email ? 'error-input' : ''}`}
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="doctor@example.com"
//                 />
//                 {validationErrors.email && (
//                     <span className="error-message">
//                         <AlertCircle className="inline-block w-4 h-4 mr-1" />
//                         {validationErrors.email}
//                     </span>
//                 )}
//             </div>

//             <div className="form-group">
//                 <label htmlFor="password" className="form-label">Password</label>
//                 <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     className={`form-input ${validationErrors.password ? 'error-input' : ''}`}
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                 />
//                 {validationErrors.password && (
//                     <span className="error-message">
//                         <AlertCircle className="inline-block w-4 h-4 mr-1" />
//                         {validationErrors.password}
//                     </span>
//                 )}
//             </div>

//             <div className="form-group">
//                 <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//                 <input
//                     type="password"
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     className={`form-input ${validationErrors.confirmPassword ? 'error-input' : ''}`}
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     placeholder="Confirm your password"
//                 />
//                 {validationErrors.confirmPassword && (
//                     <span className="error-message">
//                         <AlertCircle className="inline-block w-4 h-4 mr-1" />
//                         {validationErrors.confirmPassword}
//                     </span>
//                 )}
//             </div>
//         </>
//     );

//     const renderStep2 = () => (
//         <>
//             <div className="form-group">
//                 <label htmlFor="licenseNumber" className="form-label">Medical License Number</label>
//                 <input
//                     type="text"
//                     id="licenseNumber"
//                     name="licenseNumber"
//                     className={`form-input ${validationErrors.licenseNumber ? 'error-input' : ''}`}
//                     value={formData.licenseNumber}
//                     onChange={handleChange}
//                     placeholder="Enter your medical license number"
//                 />
//                 {validationErrors.licenseNumber && (
//                     <span className="error-message">
//                         <AlertCircle className="inline-block w-4 h-4 mr-1" />
//                         {validationErrors.licenseNumber}
//                     </span>
//                 )}
//             </div>

//             <div className="form-group">
//                 <label htmlFor="specialization" className="form-label">Specialization</label>
//                 <input
//                     type="text"
//                     id="specialization"
//                     name="specialization"
//                     className={`form-input ${validationErrors.specialization ? 'error-input' : ''}`}
//                     value={formData.specialization}
//                     onChange={handleChange}
//                     placeholder="e.g., Cardiology, Pediatrics"
//                 />
//                 {validationErrors.specialization && (
//                     <span className="error-message">
//                         <AlertCircle className="inline-block w-4 h-4 mr-1" />
//                         {validationErrors.specialization}
//                     </span>
//                 )}
//             </div>

//             <div className="form-group">
//                 <label htmlFor="experience" className="form-label">Years of Experience</label>
//                 <input
//                     type="number"
//                     id="experience"
//                     name="experience"
//                     className={`form-input ${validationErrors.experience ? 'error-input' : ''}`}
//                     value={formData.experience}
//                     onChange={handleChange}
//                     placeholder="Enter years of experience"
//                     min="0"
//                 />
//                 {validationErrors.experience && (
//                     <span className="error-message">
//                         <AlertCircle className="inline-block w-4 h-4 mr-1" />
//                         {validationErrors.experience}
//                     </span>
//                 )}
//             </div>

//             <div className="form-group">
//                 <label htmlFor="profilePhoto" className="form-label">Profile Photo</label>
//                 <div className="file-upload-container">
//                     <input
//                         type="file"
//                         id="profilePhoto"
//                         name="profilePhoto"
//                         className="form-input file-input"
//                         onChange={handleFileChange}
//                         accept="image/*"
//                     />
//                     <Upload className="upload-icon" />
//                     <span className="file-label">Choose a file or drag it here</span>
//                 </div>
//             </div>
//         </>
//     );

//     const renderStep3 = () => (
//         <>
//             <div className="form-group">
//                 <label htmlFor="clinicName" className="form-label">Clinic Name</label>
//                 <input
//                     type="text"
//                     id="clinicName"
//                     name="clinicName"
//                     className={`form-input ${validationErrors.clinicName ? 'error-input' : ''}`}
//                     value={formData.clinicName}
//                     onChange={handleChange}
//                     placeholder="Enter clinic name"
//                 />
//                 {validationErrors.clinicName && (
//                     <span className="error-message">
//                         <AlertCircle className="inline-block w-4 h-4 mr-1" />
//                         {validationErrors.clinicName}
//                     </span>
//                 )}
//             </div>

//             <div className="address-group">
//                 <div className="form-group">
//                     <label htmlFor="streetAddress" className="form-label">Street Address</label>
//                     <input
//                         type="text"
//                         id="streetAddress"
//                         name="streetAddress"
//                         className={`form-input ${validationErrors.streetAddress ? 'error-input' : ''}`}
//                         value={formData.streetAddress}
//                         onChange={handleChange}
//                         placeholder="Enter street address"
//                     />
//                     {validationErrors.streetAddress && (
//                         <span className="error-message">
//                             <AlertCircle className="inline-block w-4 h-4 mr-1" />
//                             {validationErrors.streetAddress}
//                         </span>
//                     )}
//                 </div>

//                 <div className="form-row">
//                     <div className="form-group">
//                         <label htmlFor="city" className="form-label">City</label>
//                         <input
//                             type="text"
//                             id="city"
//                             name="city"
//                             className={`form-input ${validationErrors.city ? 'error-input' : ''}`}
//                             value={formData.city}
//                             onChange={handleChange}
//                             placeholder="City"
//                         />
//                         {validationErrors.city && (
//                             <span className="error-message">
//                                 <AlertCircle className="inline-block w-4 h-4 mr-1" />
//                                 {validationErrors.city}
//                             </span>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="state" className="form-label">State</label>
//                         <input
//                             type="text"
//                             id="state"
//                             name="state"
//                             className={`form-input ${validationErrors.state ? 'error-input' : ''}`}
//                             value={formData.state}
//                             onChange={handleChange}
//                             placeholder="State"
//                         />
//                         {validationErrors.state && (
//                             <span className="error-message">
//                                 <AlertCircle className="inline-block w-4 h-4 mr-1" />
//                                 {validationErrors.state}
//                             </span>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="zipCode" className="form-label">Zip Code</label>
//                         <input
//                             type="text"
//                             id="zipCode"
//                             name="zipCode"
//                             className={`form-input ${validationErrors.zipCode ? 'error-input' : ''}`}
//                             value={formData.zipCode}
//                             onChange={handleChange}
//                             placeholder="Zip Code"
//                         />
//                         {validationErrors.zipCode && (
//                             <span className="error-message">
//                                 <AlertCircle className="inline-block w-4 h-4 mr-1" />
//                                 {validationErrors.zipCode}
//                             </span>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             <div className="form-group">
//                 <label htmlFor="websiteUrl" className="form-label">Website URL (Optional)</label>
//                 <input
//                     type="url"
//                     id="websiteUrl"
//                     name="websiteUrl"
//                     className="form-input"
//                     value={formData.websiteUrl}
//                     onChange={handleChange}
//                     placeholder="https://your-clinic-website.com"
//                 />
//             </div>
//         </>
//     );

//     const renderStep4 = () => (
//         <>
//             <div className="form-group">
//                 <label htmlFor="daysAvailable" className="form-label">Days Available</label>
//                 <select
//                     multiple
//                     id="daysAvailable"
//                     name="daysAvailable"
//                     className="form-input"
//                     value={formData.daysAvailable.split(',').filter(day => day)}
//                     onChange={(e) => {
//                         const selectedDays = Array.from(e.target.selectedOptions, option => option.value);
//                         handleChange({
//                             target: {
//                                 name: 'daysAvailable',
//                                 value: selectedDays.join(',')
//                             }
//                         });
//                     }}
//                 >
//                     {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
//                         <option key={day} value={day}>{day}</option>
//                     ))}
//                 </select>
//                 <span className="helper-text">Hold Ctrl/Cmd to select multiple days</span>
//             </div>

//             <div className="form-group">
//                 <label htmlFor="clinicTimings" className="form-label">Clinic Timings</label>
//                 <div className="time-inputs">
//                     <input
//                         type="time"
//                         id="clinicTimings"
//                         name="clinicTimings"
//                         className="form-input time-input"
//                         value={formData.clinicTimings}
//                         onChange={handleChange}
//                         placeholder="Select clinic hours"
//                     />
//                     <span className="time-separator">to</span>
//                     <input
//                         type="time"
//                         className="form-input time-input"
//                         value={formData.clinicTimings.split('-')[1] || ''}
//                         onChange={(e) => {
//                             const startTime = formData.clinicTimings.split('-')[0] || '';
//                             handleChange({
//                                 target: {
//                                     name: 'clinicTimings',
//                                     value: `${startTime}-${e.target.value}`
//                                 }
//                             });
//                         }}
//                     />
//                 </div>
//             </div>

//             <div className="form-group">
//                 <label htmlFor="aboutYourself" className="form-label">About Yourself</label>
//                 <textarea
//                     id="aboutYourself"
//                     name="aboutYourself"
//                     className="form-textarea"
//                     value={formData.aboutYourself}
//                     onChange={handleChange}
//                     placeholder="Tell us about your medical background, expertise, and approach to patient care..."
//                     rows="5"
//                 />
//             </div>
//         </>
//     );

//     return (
//         <div className="signup-container">
//             <form onSubmit={handleSubmit} className="doctor-signup-form">
//                 <div className="form-progress">
//                     {Object.entries(steps).map(([step, label]) => (
//                         <div
//                             key={step}
//                             className={`progress-step ${parseInt(step) === currentStep ? 'active' : ''}
//                                       ${parseInt(step) < currentStep ? 'completed' : ''}`}
//                         >
//                             <div className="step-number">
//                                 {parseInt(step) < currentStep ? (
//                                     <CheckCircle2 className="check-icon" />
//                                 ) : (
//                                     step
//                                 )}
//                             </div>
//                             <span className="step-label">{label}</span>
//                         </div>
//                     ))}
//                 </div>

//                 <h2 className="form-title">{steps[currentStep]}</h2>

//                 {error && (
//                     <div className="error-alert">
//                         <AlertCircle className="alert-icon" />
//                         {error}
//                     </div>
//                 )}

//                 <div className="form-content">
//                     {currentStep === 1 && renderStep1()}
//                     {currentStep === 2 && renderStep2()}
//                     {currentStep === 3 && renderStep3()}
//                     {currentStep === 4 && renderStep4()}
//                 </div>

//                 <div className="form-navigation">
//                     {currentStep > 1 && (
//                         <button
//                             type="button"
//                             className="nav-btn prev-btn"
//                             onClick={handlePrevious}
//                         >
//                             <ChevronLeft className="btn-icon" />
//                             Previous
//                         </button>
//                     )}

//                     {currentStep < 4 ? (
//                         <button
//                             type="button"
//                             className="nav-btn next-btn"
//                             onClick={handleNext}
//                         >
//                             Next
//                             <ChevronRight className="btn-icon" />
//                         </button>
//                     ) : (
//                         <button
//                             type="submit"
//                             className="nav-btn submit-btn"
//                             disabled={isLoading}
//                         >
//                             {isLoading ? 'Registering...' : 'Complete Registration'}
//                         </button>
//                     )}
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default DoctorSignUp;



import React, { useState } from 'react';
import { Check, ChevronRight, ChevronLeft, Upload, AlertCircle } from 'lucide-react';
import "./DoctorSignUp.css";

const DoctorSignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        licenseNumber: '',
        clinicName: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        specialization: '',
        experience: '',
        daysAvailable: '',
        clinicTimings: '',
        aboutYourself: '',
        profilePhoto: null,
        websiteUrl: '',
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Form steps configuration
    const steps = [
        { number: 1, label: 'Personal Info' },
        { number: 2, label: 'Clinic Details' },
        { number: 3, label: 'Professional Info' },
        { number: 4, label: 'Additional Details' }
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, profilePhoto: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (currentStep < 4) {
            setCurrentStep(prev => prev + 1);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        const clinicAddress = {
            zipCode: formData.zipCode,
            state: formData.state,
            city: formData.city,
            street: formData.streetAddress,
        };

        const doctorFormData = new FormData();

        for (let key in formData) {
            if (key !== 'zipCode' && key !== 'state' && key !== 'city' && key !== 'streetAddress') {
                doctorFormData.append(key, formData[key]);
            }
        }

        doctorFormData.append('clinicAddress', JSON.stringify(clinicAddress));

        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5000/api/auth/doctor/register', {
                method: 'POST',
                body: doctorFormData,
            });

            const result = await response.json();
            if (response.ok) {
                alert('Registration successful');
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderFormStep = () => {
        switch(currentStep) {
            case 1:
                return (
                    <div className="form-step">
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="form-input"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-input"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="form-step">
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Clinic Name</label>
                                <input
                                    type="text"
                                    name="clinicName"
                                    className="form-input"
                                    value={formData.clinicName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Street Address</label>
                                <input
                                    type="text"
                                    name="streetAddress"
                                    className="form-input"
                                    value={formData.streetAddress}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    className="form-input"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    className="form-input"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Zip Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    className="form-input"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="form-step">
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">License Number</label>
                                <input
                                    type="text"
                                    name="licenseNumber"
                                    className="form-input"
                                    value={formData.licenseNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Specialization</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    className="form-input"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Years of Experience</label>
                                <input
                                    type="number"
                                    name="experience"
                                    className="form-input"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Days Available</label>
                                <input
                                    type="text"
                                    name="daysAvailable"
                                    className="form-input"
                                    value={formData.daysAvailable}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Clinic Timings</label>
                                <input
                                    type="text"
                                    name="clinicTimings"
                                    className="form-input"
                                    value={formData.clinicTimings}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="form-step">
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">About Yourself</label>
                                <textarea
                                    name="aboutYourself"
                                    className="form-textarea"
                                    value={formData.aboutYourself}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Profile Photo</label>
                                <div className="file-upload-container">
                                    <input
                                        type="file"
                                        name="profilePhoto"
                                        className="file-input"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        required
                                    />
                                    <Upload className="upload-icon" size={24} />
                                    <p>Drop your image here or click to browse</p>
                                    {previewUrl && (
                                        <div className="image-preview">
                                            <img src={previewUrl} alt="Preview" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" data-optional>Website URL</label>
                                <input
                                    type="url"
                                    name="websiteUrl"
                                    className="form-input"
                                    value={formData.websiteUrl}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="doctor-signup-form">
                <h2 className="form-title">Doctor Registration</h2>

                {error && (
                    <div className="error-message">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                <div className="form-progress">
                    {steps.map(step => (
                        <div
                            key={step.number}
                            className={`progress-step ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
                        >
                            <div className="step-number">
                                {currentStep > step.number ? <Check size={20} /> : step.number}
                            </div>
                            <div className="step-label">{step.label}</div>
                        </div>
                    ))}
                </div>

                {renderFormStep()}

                <div className="form-navigation">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            className="nav-btn prev-btn"
                            onClick={() => setCurrentStep(prev => prev - 1)}
                        >
                            <ChevronLeft size={20} />
                            Previous
                        </button>
                    )}
                    <button
                        type="submit"
                        className="nav-btn next-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : currentStep < 4 ? (
                            <>
                                Next
                                <ChevronRight size={20} />
                            </>
                        ) : 'Complete Registration'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DoctorSignUp;
