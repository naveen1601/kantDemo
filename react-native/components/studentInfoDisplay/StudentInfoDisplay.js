import React from 'react';
import { View } from 'react-native';
import Text from '../../baseComponents/text/Text';
import { create } from '../../helpers/PlatformSpecificStyles';
import StudentInfoDisplayStyles from './StudentInfoDisplayStyles';
import PropTypes from 'prop-types';


StudentInfoDisplay = (props) => {

    let name = props.name ? props.name.toUpperCase() : "";
    const comptencyLevel = props.compLevel && props.compLevel/100;

    const userInitialWrapper = [styles.userInitialWrapper];
    const studentInfoContainer = [styles.studentInfoContainer];
    const userInfoDivision = [styles.userInfoDivision];
    const displayName = [styles.displayName];
    const userInitial = [styles.userInitial];
    const displayGradeLabel = [styles.displayGradeLabel];
    const displayGradeValue = [styles.displayGradeValue];
    const diplaySchool = [styles.diplaySchool];

    if (props.isSmall) {

        userInfoDivision.push(styles.userInfoDivision_small);
        displayName.push(styles.displayName_small)
        userInitial.push(styles.userInitial_small)
        userInitialWrapper.push(styles.userInitialWrapper_small)
        studentInfoContainer.push(styles.studentInfoContainer_small)

    }

    renderIcon = () => {
        let initial = name ? name.charAt(0) : "";
        return (
            <View style={userInitialWrapper}>
                <Text style={userInitial}
                    testID="userInitial"
                    fontWeight="bold">{initial}</Text>
            </View>
        );
    };
    return (
        <View style={studentInfoContainer}>
            {renderIcon()}
            <View style={userInfoDivision}>
                <Text style={displayName}>{name}</Text>
                {!!props.grade &&
                    <Text style={displayGradeLabel}>{`Grade: ${props.grade}`}</Text>
                }
                {!!props.rollNum &&
                    <Text style={diplaySchool}>{`Roll No. ${props.rollNum}`}</Text>
                }
                {!!props.position &&
                    <Text style={diplaySchool}>{`Position: ${props.position}`}</Text>
                }
                {!!props.compLevel &&
                    <Text style={diplaySchool}>{`Level: ${comptencyLevel}`}</Text>
                }
                {!!props.school &&
                    <Text style={diplaySchool}>{props.school}</Text>
                }
                {!!props.schoolCode &&
                    <Text style={diplaySchool}>{`School Code: ${props.schoolCode}`}</Text>
                }
            </View>
        </View>
    );

}

StudentInfoDisplay.propTypes = {
    name: PropTypes.string.isRequired,
    grade: PropTypes.number,
    school: PropTypes.string,
    isSmall: PropTypes.bool

};

let styles = create(StudentInfoDisplayStyles)

export default StudentInfoDisplay;