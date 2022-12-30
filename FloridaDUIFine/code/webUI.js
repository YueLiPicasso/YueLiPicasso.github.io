const dateElem  = document.getElementById("date_of_instant_offense");
const dcElem    = document.getElementById("driving_or_in_control");
const fiElem    = document.getElementById("faculties_impaired");
const blacElem  = document.getElementById("blood_alcohol_level");
const bracElem  = document.getElementById("breath_alcohol_level");
const pcElem    = document.getElementById("prior_count");
const ldateElem = document.getElementById("date_of_last_offense");
const dpElem    = document.getElementById("damage_to_property");
const liElem    = document.getElementById("light_injury");
const siElem    = document.getElementById("serious_injury");
const dtElem    = document.getElementById("death");
const kcElem    = document.getElementById("know_crash");
const faElem    = document.getElementById("fail_to_aid");
const amElem    = document.getElementById("accompanied_by_minor");
const output    = document.getElementById("output");

function webUI_init () {
    dateElem.value = "2023-01-01";
    dcElem.checked = true;
    fiElem.checked = false;
    blacElem.value = "NA";
    bracElem.value = "NA";
    pcElem.value = 0;
    ldateElem.value = "";
    dpElem.checked = false;
    liElem.checked = false;
    siElem.checked = false;
    dtElem.checked = false;
    kcElem.checked = false;
    faElem.checked = false;
    amElem.checked = false;
    output.innerText = "";
}

function computeFine () {
    // displaying input values for debugging
    const msg = "Date of DUI : " + dateElem.value + "\n" +
	  "Driving or in control : " + dcElem.checked + "\n" +
	  "Faculties Impaired : " + fiElem.checked + "\n" +
	  "Blood alcohol : " + blacElem.value + "\n" +
	  "breath alcohol : " + bracElem.value + "\n" +
	  "count of prior DUI : " + pcElem.value + "\n" +
	  "Date of last DUI : " +  ldateElem.value + "\n"  +
	  "Damage to property : " + dpElem.checked + "\n" +
	  "light bodily injury : " + liElem.checked + "\n" + 
	  "Serious bodily injury to another : " + siElem.checked + "\n" +
	  "death : " + dtElem.checked + "\n" + 
	  "know crash occured : " + kcElem.checked + "\n" +
	  "fail to aid : " + faElem.checked + "\n" +
	  "accompanied by minor : " + amElem.checked + "\n";
    
    const fine = FloridaLib.dUI(
	{
	    dateOfTheCurrentDUIOffenseIn: dateElem.value,
	    isDrivingOrInActualPhysicalControlOfAVehicleWithinThisStateIn: dcElem.checked,
	    isSoInfluencedThatTheNormalFacultiesAreImpairedIn: fiElem.checked, 
	    bloodAlcoholLevelIn: (blacElem.value == "NA" ?
				  { kind: "Not_Applicable" } :
				  { kind: "Decimal", payload: blacElem.value }),
	    breathAlcoholLevelIn: (bracElem.value == "NA" ?
				   { kind: "Not_Applicable" } :
				   { kind: "Decimal", payload: bracElem.value }),
	    countOfPreviousDUIConvictionsIn: parseInt(pcElem.value),
	    dateOfTheMostRecentPriorDUIConvictionIn: (ldateElem.value == "" ?
						      { kind: "Not_Applicable" } :
						      { kind: "Date", payload: ldateElem.value }),
	    thePersonOperatesAVehcleIn: true,
	    causesOrContributesToCausingDamageToThePropertyOfAnotherIn: dpElem.checked,
	    causesOrContributesToCausingDamageToThePersonOfAnotherNotDeathNotSeriousInjuryIn: liElem.checked,
	    causesOrContributesToCausingSeriousBodilyInjuryToAnotherIn: siElem.checked,
	    causesOrContributesToCausingTheDeathOfAnyHumanBeingOrUnbornChildIn: dtElem.checked,
	    atTheTimeOfTheCrashThePersonKnewOrShouldHaveKnownTheCrashOccurredIn: kcElem.checked,
            thePersonFailedToGiveInformationAndRenderAidAsRequiredIn: faElem.checked, 
	    accompaniedInTheVehicleByAPersonUnderTheAgeOf18YearsIn: amElem.checked,
	}
    );
    output.innerText =
	"Fine by 316.193(2)&(4):\n"
	+ "$ " + fine.fineByRecordOut.min.toString() + " ~ $ " +  fine.fineByRecordOut.max.toString() + "\n\n"
	+ "Fine by 316.193(3):\n"
	+ "$ " + fine.fineByDamageOut.min.toString() + " ~ $ " + fine.fineByDamageOut.max.toString();
    // alert(msg); // displaying input values for debugging
}

webUI_init();
