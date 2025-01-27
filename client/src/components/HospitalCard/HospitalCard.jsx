// import { Link } from 'react-router-dom';
// import './HospitalCard.css';

// const HospitalCard = ({ hospital }) => {
//   const imageUrl = hospital.profilePhoto
//     ? `/uploads/hospitals/${hospital._id}/${hospital.profilePhoto}`  // Correct path for the uploaded image
//     : '/default-avatar.png';  // Fallback to default avatar if no photo is available

//   return (
//     <div className="hospital-card">
//       <img className="hospital-image" src={imageUrl} alt={hospital.hospitalName} />
//       <div className="hospital-info">
//         <h3 className="hospital-name">{hospital.hospitalName}</h3>
//         <p className="hospital-location">
//           <i className="location-icon"></i> {hospital.address.street}
//         </p>
//         <p className="hospital-specialties">
//           Specialties: {hospital.specialties}
//         </p>
//         <div className="hospital-actions">
//           {/* Replace button with a Link to go to hospital details */}
//           <Link to={`/hospitals/${hospital._id}`} className="details-btn">
//             View Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HospitalCard;


import { Link } from 'react-router-dom';
import { MapPin, Award, ArrowRight } from 'lucide-react';
import './HospitalCard.css';

const HospitalCard = ({ hospital }) => {
  const imageUrl = !hospital.profilePhoto
    ? `/uploads/hospitals/${hospital._id}/${hospital.profilePhoto}`
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIa7Hghwr_3y1fHcUnR7RVkS2M3YWTFzBuGQ&s';  // Fallback hospital image

  return (
    <div className="hospital-card">
      <div className="image-container">
        <img className="hospital-image" src={imageUrl} alt={hospital.hospitalName} />
      </div>
      <div className="hospital-info">
        <h3 className="hospital-name">{hospital.hospitalName}</h3>
        <div className="info-row">
          <MapPin size={16} className="icon" />
          <p className="hospital-location">{hospital.address.street}</p>
        </div>
        <div className="info-row">
          <Award size={16} className="icon" />
          <p className="hospital-specialties">{hospital.specialties}</p>
        </div>
        <Link to={`/hospitals/${hospital._id}`} className="details-btn">
          View Details
          <ArrowRight size={16} className="arrow-icon" />
        </Link>
      </div>
    </div>
  );
};

export default HospitalCard;
