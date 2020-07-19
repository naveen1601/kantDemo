import React from 'react';
import { View } from 'react-native';
import Text from '../../baseComponents/text/Text';
import { create } from '../../helpers/PlatformSpecificStyles';
import StudentInfoDisplayStyles from './StudentInfoDisplayStyles';
import PropTypes from 'prop-types';


StudentInfoDisplay = (props) => {

    let name = props.name ? props.name.toUpperCase() : "";
    
    renderIcon = () => {
        let initial = name ? name.charAt(0) : "";
        return (
            <View style={styles.userInitialWrapper}>
                <Text style={styles.userInitial}
                    testID="userInitial"
                    fontWeight="bold">{initial}</Text>
            </View>
        );
    };
    return (
        <View style={styles.studentInfoContainer}>
            {renderIcon()}
            <View style={styles.userInfoDivision}>
                <Text style={styles.displayName}>{name}</Text>
                <Text style={styles.displayGradeLabel}>Grade: <Text style={styles.displayGradeValue}>{props.grade}</Text></Text>
                {props.school &&
                    <Text style={styles.diplaySchool}>{props.school}</Text>
                }
            </View>
        </View>
    );

}

StudentInfoDisplay.propTypes = {
    name: PropTypes.string.isRequired,
    grade: PropTypes.number,
    school: PropTypes.string,
    
};

let styles = create(StudentInfoDisplayStyles) 

export default StudentInfoDisplay;