import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  Paper,
} from "@mui/material";

const CheckIn = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [numFamilyMembers, setNumFamilyMembers] = useState(1);
  const [familyList, setFamilyList] = useState([]);
  const [members, setMembers] = useState([{ name: "", aadhaar: "" }]);

  const handleCheckIn = () => {
    console.log(hotelId, members);
    for (let member of members) {
      if (!member.name || !member.aadhaar) {
        alert("Please fill name and aadhar.");
        return;
      }
    }
  
    setFamilyList([...familyList, ...members]);
    setMembers([{ name: "", aadhaar: "" }]);
    setNumFamilyMembers(1);
    alert("Check-in completed!");
  };

  const handleFamilyMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleNumFamilyMembersChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumFamilyMembers(num);

    let requiredFields = 1;
    if (num >= 2 && num <= 4) requiredFields = 2;
    else if (num > 4) requiredFields = 4;

    setMembers(
      new Array(requiredFields)
        .fill(null)
        .map(() => ({ name: "", aadhaar: "" }))
    );
  };

  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Web Check-In
      </Typography>

      <TextField
        label="Number of Family Members"
        type="number"
        variant="outlined"
        fullWidth
        value={numFamilyMembers}
        onChange={handleNumFamilyMembersChange}
        sx={{ mb: 2 }}
      />

      {members.map((member, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <TextField
            label={`Name ${index + 1}`}
            variant="outlined"
            fullWidth
            value={member.name}
            onChange={(e) =>
              handleFamilyMemberChange(index, "name", e.target.value)
            }
            sx={{ mb: 1 }}
          />
          <TextField
            label={`Aadhaar ${index + 1}`}
            variant="outlined"
            fullWidth
            value={member.aadhaar}
            onChange={(e) =>
              handleFamilyMemberChange(index, "aadhaar", e.target.value)
            }
            sx={{ mb: 2 }}
          />
        </div>
      ))}

      <Button variant="contained" color="primary" onClick={handleCheckIn}>
        Submit
      </Button>

      <Button
        variant="outlined"
        sx={{ ml: 2 }}
        onClick={() => navigate("/book-hotel")}
      >
        Back to Hotels
      </Button>
      <Button variant="contained" onClick={() => navigate("/register")}>
        Register Client
      </Button>

      <Typography variant="h5" sx={{ mt: 4 }}>
        Family Booked List
      </Typography>
      <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
        <List>
          {familyList.length === 0 ? (
            <Typography color="textSecondary">
              No family members checked in yet.
            </Typography>
          ) : (
            familyList.map((entry, index) => (
              <ListItem key={index}>
                {entry.name} - Aadhaar: {entry.aadhaar}
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default CheckIn;
