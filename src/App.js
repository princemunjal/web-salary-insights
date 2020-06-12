import React, {Component} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import Loading from './Backdrop';
import './App.css';

class App extends Component {
  state = {
    gender:"",
    experience:"",
    jobTitle:"",
    validateGender:"",
    validateJobTitle:"",
    validateExperience:"",
    showBackdrop:false,
    predictedSalary:"",
    validateResponse:"",
  }

  onSubmitHandler = (event) => {
      event.preventDefault()

      let inputError = false

      if(this.state.gender==="") {
        this.setState({validateGender:"Required."})
        inputError = true
      }

      if(this.state.experience==="") {
        this.setState({validateExperience:"Required."})
        inputError = true
      } 

      if(this.state.jobTitle==="") {
        this.setState({validateJobTitle:"Required."})
        inputError = true
      }

      if(!inputError) {
        const request_data = {
          experience: this.state.experience,
          jobTitle: this.state.jobTitle,
          gender: this.state.gender
        }
        this.setState({showBackdrop:true})

        axios.post("/", request_data).then(
          response => {
            this.setState({showBackdrop:false, predictedSalary:response.data.predictedSalary})
          }
        ).catch((error) => {
            if(typeof(error.response) === "undefined") {
              this.setState({showBackdrop:false, validateResponse:error.message + '. Please contact administrator.'})
            } else {
              console.log(error.response.data)
              this.setState({showBackdrop:false, validateResponse:error.response.data.message})
            }
        })
      }


  }

  render() {
      return (
        <div className="App">
            <Loading open={this.state.showBackdrop} />
            <h1 className="h1"> Get Your Salary Insights </h1>
            <form  className="form" autoComplete="off" onSubmit={(event)=>this.onSubmitHandler(event)}>
              <div className="obj_input">
                <p className="label">Work experience:</p> 
                <TextField name="experience" value={this.state.experience} variant="outlined" color="secondary"
                          InputProps={{
                            endAdornment:<InputAdornment position="end">Yrs.</InputAdornment>,
                          }}
                          error={this.state.validateExperience!==""} helperText={this.state.validateExperience} type="number"
                          size="medium" className="textfield" 
                          onChange={(event) => this.setState({experience:event.target.value, validateExperience:''})} />
              </div>
              <div className="obj_input">
                <p className="label">Job title:</p>
                <FormControl variant="outlined" className="textfield" color="secondary" error={this.state.validateJobTitle!==""}>
                  <Select
                    name="title"
                    value={this.state.jobTitle}
                    onChange={(event) => this.setState({jobTitle:event.target.value, validateJobTitle:''})} 
                  >
                    <MenuItem value="0">Administrator</MenuItem>
                    <MenuItem value="1">Engineer</MenuItem>
                    <MenuItem value="2">IT</MenuItem>
                    <MenuItem value="3">Media</MenuItem>
                    <MenuItem value="4">Medical</MenuItem>
                    <MenuItem value="5">Others</MenuItem>
                    <MenuItem value="6">Sales</MenuItem>
                    <MenuItem value="7">Scientist</MenuItem>
                    <MenuItem value="8">Teacher</MenuItem>
                    <MenuItem value="9">Accountant</MenuItem>
                    <MenuItem value="10">HR</MenuItem>
                  </Select>
                  <FormHelperText>{this.state.validateJobTitle}</FormHelperText>
                </FormControl>
              </div>
              <div className="obj_input">
                <p className="label">Gender:</p>
                <FormControl component="fieldset" error={this.state.validateGender!==""}>
                  <RadioGroup required className="gender" name="gender" value={this.state.gender} 
                    onChange={(event) => this.setState({gender:event.target.value, validateGender:''})} >
                    <FormControlLabel value="0" control={<Radio />} label="Female" />
                    <FormControlLabel value="1" control={<Radio />} label="Male" />
                  </RadioGroup>
                  <FormHelperText>{this.state.validateGender}</FormHelperText>
                </FormControl>
              </div>
              <div className="obj_input" align="center">
                <Button variant="contained" type="submit" color="secondary" className="button" align="right" startIcon={<SettingsRoundedIcon />}>
                  Predict
                </Button>
              </div>
            </form>
            { this.state.predictedSalary !== "" ?
              <div className="output_box">
                <p className="label">Your estimated salary (in USD):&nbsp;</p>
                <p className="output">${this.state.predictedSalary}</p>
              </div>
            :null }
            { this.state.validateResponse !== "" ?
              <div className="output_box">
                <p className="error">{this.state.validateResponse}</p>
              </div>
            :null}
        </div>
      )
    }
}

export default App;
