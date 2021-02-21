import React from 'react'

const InfoCard = ({profile}) => {
    console.log(profile)
    return (
        <div className="profileCard">
            <h4 className="h4info h4name">{profile.name.first} {profile.name.last}</h4>
            <h4 className="h4info h4email">{profile.email}</h4>
            <h4 className="h4info h4age">{profile.dob.age}</h4>
        </div>
    )
}

export default InfoCard
