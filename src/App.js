import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './App.css';

function App() {
  const [gender, setGender] = React.useState('')
  const [experience, setExperience] = React.useState('')
  const [jobTitle, setJobTitle] = React.useState('')
  const [validateGender, setValidateGender] = React.useState('')
  const [validateExperience, setValidateExperience] = React.useState('')
  const [validateJobTitle, setValidateJobTitle] = React.useState('')

  const onInputExperience = (event) => {
      setExperience(event.target.value);
      setValidateExperience('')
  }

  const onInputJobTitle = (event) => {
      setJobTitle(event.target.value);
      setValidateJobTitle('')
  }

  const onInputGender = (event) => {
      setGender(event.target.value);
      setValidateGender('')
  }

  const onSubmitHandler = (event) => {
      event.preventDefault()

      let inputError = false

      if(gender==="") {
        setValidateGender("Required.")
        inputError = true
      }

      if(experience==="") {
        setValidateExperience("Required.")
        inputError = true
      }

      if(jobTitle==="") {
        setValidateJobTitle("Required.")
        inputError = true
      }

      if(!inputError) {
        alert("Work experience: "+experience+", Job title:" + jobTitle +", Gender: " + gender)
      }


  }

  return (
    <div className="App">
        <h1 className="h1"> Get Your Salary Insights </h1>
        <form  className="form" autoComplete="off" onSubmit={(event)=>onSubmitHandler(event)}>
          <div className="obj_input">
            <p className="label">Work experience:</p> 
            <TextField name="experience" value={experience} variant="outlined" color="secondary"
                      InputProps={{
                        endAdornment:<InputAdornment position="end">Yrs.</InputAdornment>,
                      }}
                      error={validateExperience!==""} helperText={validateExperience} type="number"
                      size="medium" className="textfield" onChange={onInputExperience} />
          </div>
          <div className="obj_input">
            <p className="label">Job title:</p>
            <TextField name="title" value={jobTitle} className="textfield" variant="outlined" color="secondary" 
                      error={validateJobTitle!==""} helperText={validateJobTitle}
                      size="medium" onChange={onInputJobTitle} />
          </div>
          <div className="obj_input">
            <p className="label">Gender:</p>
            <FormControl component="fieldset" error={validateGender!==""}>
              <RadioGroup required className="gender" name="gender" value={gender} onChange={onInputGender}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
              <FormHelperText>{validateGender}</FormHelperText>
            </FormControl>
          </div>
          <div className="obj_input" align="center">
            <Button variant="contained" type="submit" color="secondary" className="button" align="right" startIcon={<SettingsRoundedIcon />}>
              Predict
            </Button>
          </div>
        </form>
    </div>
  );
}

export default App;
