import React, { Component } from 'react';
import { create } from '../../helpers/PlatformSpecificStyles';
import GuestScreenStyles from './GuestScreenStyles'
import { View } from 'react-native';
import GradeOption from '../../components/gradeOption/GradeOption'
import Text from '../../baseComponents/text/Text';
import TextInput from '../../baseComponents/textInput/TextInput';
import Button from '../../baseComponents/button/Button';
import _ from 'lodash';

class GuestScreen extends Component {
    state = { 
        name: "",
        grade: 0,
        
    };

    handleNameChange = (name) => {
        this.setState({ 
            name
        });
    }

    handleGradeSelection =(grade)=>{
        this.setState({ 
            grade
        });
    }

    handleGuestSubmit = () =>{

    }
    
    render() {
        return (
            <View style={styles.guestScreen}>
                <GradeOption options={[1,2,3,4]}
                    onSelect= {this.handleGradeSelection}
                    value= {this.state.grade}/>
                
                <Text>Enter Name:</Text>
                <TextInput value={this.state.name}
                    placeholder= "First Name"
                    onChangeText= {this.handleNameChange}/>
                <Button
                    onPress={() => { }}
                    text="Submit"
                />
            </View>
        );
    }
}
let styles = create(GuestScreenStyles);
export default GuestScreen;