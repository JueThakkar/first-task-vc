var applicantInfoFlgVal = "";
var b_date ;
var b_month ;
var b_year ;


function val(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /^\d*\.?\d*$/; // added this to accept decimal also
    if (!regex.test(key) && evt.keyCode != 8 && evt.keyCode != 9 && evt.keyCode != 17 && evt.keyCode != 65 && evt.keyCode != 97) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\%/;
    if (!regex.test(key) && evt.keyCode != 8 && evt.keyCode != 9 && evt.keyCode != 93) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function text(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /^[a-zA-Z\s-, ]+$/;
    if (!regex.test(key) && evt.keyCode != 8 && evt.keyCode != 9 && evt.keyCode != 93) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function limitAlertStatus() {
    if ($('#EmpType').val() == "job(Salaried)") {
        var amt = $('#loanAmt').val();
        $('#actualLimitTxt').text(amt);

        if (parseInt($('#actualLimitTxt').text()) <= parseInt($('#ExLimit').text())) {
            $('#LimitStatus').text("Met");
            $('#LimitStatus').addClass('text-success');
            $('#LimitStatus').removeClass('text-danger');
        } else {
            $('#LimitStatus').text("Not Met");
            $('#LimitStatus').removeClass('text-success');
            $('#LimitStatus').addClass('text-danger');
        }
    } else if ($('#EmpType').val() == "business(SelfEmployeed)") {
        var loanAmt = $('#loanAmt').val();
        var turnOver = $('#GrossTurnover').val();
        var totalAssets = $('#TotalAssets').val();
        var stockDepth = $('#StockBookDepth').val();

        $('#actualLimitTxt').text(loanAmt);

        if (parseFloat(loanAmt) < (5 * parseFloat(turnOver)) && parseFloat(loanAmt) < (0.7 * (parseFloat(totalAssets) + parseFloat(stockDepth)) / 2)) {
            $('#LimitStatus').text("Met");
            $('#LimitStatus').addClass('text-success');
            $('#LimitStatus').removeClass('text-danger');
        } else {
            $('#LimitStatus').text("Not Met");
            $('#LimitStatus').removeClass('text-success');
            $('#LimitStatus').addClass('text-danger');
        }
    }
}

function RCCriteria() {
    var appAnnualIncome = $('#AnnIncome').val();
    var appGrossMonthlyIncome = $('#NMI').val();
    var coApp1AnnualIncome = $('#CoApp1AnnIncome').val();
    var coApp1GrossMonthlyIncome = $('#CoApp1NMI').val();
    var coApp2AnnualIncome = $('#CoApp2AnnIncome').val();
    var coApp2GrossMonthlyIncome = $('#CoApp2NMI').val();
    var loanRequestEmiVal = $('#EMI').val();
    var otherEmiFlg = $('#OtherLoanFlag').val();
    var otherEmiTotalValue = $('#TotalLoanEMI').val();
    var coApp1OtherEmiTotalValue = $('#CoApp1TotalLoanEMI').val();
    var coApp2OtherEmiTotalValue = $('#CoApp2TotalLoanEMI').val();

    //getting this data from Database
    var dbIncomeCriteria = $('#IncomeDetail').text();
    var dbMinIncome = $('#MinIncome').text();
    var dbMinEmiRate = $('#MinEmi').text();
    var dbLessIncome = $('#LessIncome').text();
    var dbGreaterIncome = $('#GreaterIncome').text();
    var dbBetweenEmiRate = $('#BetweenEmi').text();
    var dbAboveIncome = $('#AboveIncome').text();
    var dbAboveEmiRate = $('#AboveEmi').text();

    var annualIncome, grossMonthlyIncome

    // Check if co-applicant is existing or not
    // If existing then consider there gross income also
    if (coApp1GrossMonthlyIncome != 0 && coApp2GrossMonthlyIncome != 0) {
        annualIncome = parseFloat(appAnnualIncome) + parseFloat(coApp1AnnualIncome) + parseFloat(coApp2AnnualIncome);
        grossMonthlyIncome = parseFloat(appGrossMonthlyIncome) + parseFloat(coApp1GrossMonthlyIncome) + parseFloat(coApp2GrossMonthlyIncome);
    } else if (coApp1GrossMonthlyIncome != 0) {
        annualIncome = parseFloat(appAnnualIncome) + parseFloat(coApp1AnnualIncome);
        grossMonthlyIncome = parseFloat(appGrossMonthlyIncome) + parseFloat(coApp1GrossMonthlyIncome);
    } else {
        annualIncome = appAnnualIncome;
        grossMonthlyIncome = appGrossMonthlyIncome;
    }

    if (dbIncomeCriteria == "Income") {
        if (annualIncome <= parseFloat(dbMinIncome)) {
            $('#ExIncome').text(dbMinIncome);
            if (coApp1OtherEmiTotalValue != "" && coApp2OtherEmiTotalValue != "" && otherEmiTotalValue != "") {
                var grossIncome = parseFloat(grossMonthlyIncome) - (parseFloat(otherEmiTotalValue) + parseFloat(coApp1OtherEmiTotalValue) + parseFloat(coApp2OtherEmiTotalValue));
                var grossEmi = parseFloat(grossIncome) * (parseFloat(dbMinEmiRate) / 100);
            } else if (coApp1OtherEmiTotalValue != "" && otherEmiTotalValue != "") {
                var grossIncome = parseFloat(grossMonthlyIncome) - (parseFloat(otherEmiTotalValue) + parseFloat(coApp1OtherEmiTotalValue));
                var grossEmi = parseFloat(grossIncome) * (parseFloat(dbMinEmiRate) / 100);
            } else if (otherEmiFlg == 1 && otherEmiTotalValue != "") {
                var grossIncome = parseFloat(grossMonthlyIncome) - parseFloat(otherEmiTotalValue);
                var grossEmi = parseFloat(grossIncome) * (parseFloat(dbMinEmiRate) / 100);
            } else {
                var grossIncome = parseFloat(grossMonthlyIncome);
                var grossEmi = parseFloat(grossIncome) * (parseFloat(dbMinEmiRate) / 100);
            }

            if (grossEmi >= loanRequestEmiVal) {
                $('#IncomeStatus').text("Met");
                $('#IncomeStatus').addClass('text-success');
                $('#IncomeStatus').removeClass('text-danger');
            } else {
                $('#IncomeStatus').text("Not Met");
                $('#IncomeStatus').removeClass('text-success');
                $('#IncomeStatus').addClass('text-danger');
            }
        } else if (annualIncome >= parseFloat(dbLessIncome) && annualIncome <= parseFloat(dbGreaterIncome)) {
            $('#ExIncome').text(">= " + dbLessIncome + " <= " + dbGreaterIncome);
            if (coApp1OtherEmiTotalValue != "" && coApp2OtherEmiTotalValue != "" && otherEmiTotalValue != "") {
                var grossIncome = parseFloat(grossMonthlyIncome) - (parseFloat(otherEmiTotalValue) + parseFloat(coApp1OtherEmiTotalValue) + parseFloat(coApp2OtherEmiTotalValue));
                var grossEmi = parseFloat(grossIncome) * (parseFloat(dbMinEmiRate) / 100);
            } else if (coApp1OtherEmiTotalValue != "" && otherEmiTotalValue != "") {
                var grossIncome = parseFloat(grossMonthlyIncome) - (parseFloat(otherEmiTotalValue) + parseFloat(coApp1OtherEmiTotalValue));
                var grossEmi = parseFloat(grossIncome) * (parseFloat(dbMinEmiRate) / 100);
            } else if (otherEmiFlg == 1 && otherEmiTotalValue != "") {
                var grossIncome = parseFloat(grossMonthlyIncome) - parseFloat(otherEmiTotalValue);
                var grossEmi = parseFloat(grossIncome) * (parseFloat(dbBetweenEmiRate) / 100);
            } else {
                var grossIncome = parseFloat(grossMonthlyIncome);
                var grossEmi = parseFloat(grossIncome) * (parseFloat(dbBetweenEmiRate) / 100);
            }

            if (grossEmi >= loanRequestEmiVal) {
                $('#IncomeStatus').text("Met");
                $('#IncomeStatus').addClass('text-success');
                $('#IncomeStatus').removeClass('text-danger');
            } else {
                $('#IncomeStatus').text("Not Met");
                $('#IncomeStatus').removeClass('text-success');
                $('#IncomeStatus').addClass('text-danger');
            }
        } else if (annualIncome >= parseFloat(dbAboveIncome)) {
            $('#ExIncome').text(">= " + dbAboveIncome);
            if (coApp1OtherEmiTotalValue != "" && coApp2OtherEmiTotalValue != "" && otherEmiTotalValue != "") {
                var grossIncome = parseFloat(grossMonthlyIncome) - (parseFloat(otherEmiTotalValue) + parseFloat(coApp1OtherEmiTotalValue) + parseFloat(coApp2OtherEmiTotalValue));
                var grossEmi = parseFloat(grossIncome) * (parseFloat(dbMinEmiRate) / 100);
            } else if (coApp1OtherEmiTotalValue != "" && otherEmiTotalValue != "") {
                var grossIncome = parseFloat(grossMonthlyIncome) - (parseFloat(otherEmiTotalValue) + parseFloat(coApp1OtherEmiTotalValue));
                var grossEmi = parseFloat(grossIncome) * (parseFloat(dbMinEmiRate) / 100);
            } else if (otherEmiFlg == 1 && otherEmiTotalValue != "") {
                var grossIncome = parseFloat(grossMonthlyIncome) - parseFloat(otherEmiTotalValue);
                var grossEmi = parseFloat(grossIncome) * (parseFloat(dbAboveEmiRate) / 100);
            } else {
                var grossIncome = parseFloat(grossMonthlyIncome);
                var grossEmi = parseFloat(grossIncome) * (parseFloat(dbAboveEmiRate) / 100);
            }

            if (grossEmi >= loanRequestEmiVal) {
                $('#IncomeStatus').text("Met");
                $('#IncomeStatus').addClass('text-success');
                $('#IncomeStatus').removeClass('text-danger');
            } else {
                $('#IncomeStatus').text("Not Met");
                $('#IncomeStatus').removeClass('text-success');
                $('#IncomeStatus').addClass('text-danger');
            }
        }
    } else if (dbIncomeCriteria == "IT Return") {
        $('#ExIncome').text("-");
        // console.log(value);
        if (coApp1OtherEmiTotalValue != "" && coApp2OtherEmiTotalValue != "" && otherEmiTotalValue != "") {
            var grossIncome = parseFloat(grossMonthlyIncome) - (parseFloat(otherEmiTotalValue) + parseFloat(coApp1OtherEmiTotalValue) + parseFloat(coApp2OtherEmiTotalValue));
            var grossEmi = parseFloat(grossIncome) * 0.6;
        } else if (coApp1OtherEmiTotalValue != "" && otherEmiTotalValue != "") {
            var grossIncome = parseFloat(grossMonthlyIncome) - (parseFloat(otherEmiTotalValue) + parseFloat(coApp1OtherEmiTotalValue));
            var grossEmi = parseFloat(grossIncome) * 0.6;
        } else if (otherEmiFlg == 1 && otherEmiTotalValue != "") {
            var grossIncome = parseFloat(grossMonthlyIncome) - parseFloat(otherEmiTotalValue);
            var grossEmi = parseFloat(grossIncome) * 0.6;
        } else {
            var grossIncome = parseFloat(grossMonthlyIncome);
            var grossEmi = parseFloat(grossIncome) * 0.6;
        }

        if (grossEmi >= loanRequestEmiVal) {
            $('#IncomeStatus').text("Met");
            $('#IncomeStatus').addClass('text-success');
            $('#IncomeStatus').removeClass('text-danger');
        } else {
            $('#IncomeStatus').text("Not Met");
            $('#IncomeStatus').removeClass('text-success');
            $('#IncomeStatus').addClass('text-danger');
        }
    }
}

function MarginCal() {
    // MortgagePropertyVal - loan request amount / (MortgagePropertyVal)*100
    // If another MortgagePropertyVal available
    // Then MortgagePropertyVal1+MortgagePropertyVal2 - loan request amount / (MortgagePropertyVal1+MortgagePropertyVal2)*100
    var loanamt = $('#loanAmt').val();
    if ($('#APropvalue1').val() != "") {
        var MortgagePropertyVal = ((parseFloat($('#APropvalue1').val())) + (parseFloat($('#Propvalue').val())));
        console.log(MortgagePropertyVal);
    } else {
        var MortgagePropertyVal = $('#Propvalue').val();
        console.log(MortgagePropertyVal);
    }

    var marginCal = ((parseFloat(MortgagePropertyVal) - parseFloat(loanamt)) / (parseFloat(MortgagePropertyVal)) * 100);
    var marginVal = marginCal.toFixed(0)

    if ($('#PersonalBusiness').val() != 'business_use') {
        $('#actualMargin').text(marginVal);
        if (parseFloat(marginVal) >= parseFloat($('#ExMargin').text())) {
            $('#MarginStatus').text("Met");
            $('#MarginStatus').addClass('text-success');
            $('#MarginStatus').removeClass('text-danger');
        } else {
            $('#MarginStatus').text("Not Met");
            $('#MarginStatus').removeClass('text-success');
            $('#MarginStatus').addClass('text-danger');
        }
    }
}

$("#Propvalue").keyup(function(e) {
    MarginCal();
});

$("#APropvalue1").keyup(function(e) {
    MarginCal();
});

$('#LimitStatus').text("Not Met");
$('#MarginStatus').text("Not Met");
$('#AgeStatus').text("Not Met");
$('#IncomeStatus').text("Not Met");

$('#loanAmt').keyup(function(e) {
    var amt = $(this).val();

    if ($('#PersonalBusiness').val() != 'business_use') {
        limitAlertStatus();
    }
});

//Set Processing Fee Based on Loa Amount and Loan Type
//Based on 10th Oct requirement
function processingFeeDisplay() {
    var lonetypeId = 0
    if (($('#plt').val() != "") && ($('#PersonalBusiness').val() == "personal_use")) {
        var pLonetypeId = $('#plt').val();
        lonetypeId = pLonetypeId
    }
    if (($('#blt').val() != "") && ($('#PersonalBusiness').val() == "business_use")) {
        var bLonetypeId = $('#blt').val();
        lonetypeId = bLonetypeId
    }
    if (lonetypeId > 0) {
        $.ajax({
            method: 'GET',
            url: '/eligibility-data?loanTypeId=' + lonetypeId,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#processing").hide();
                if (result.s.c == 0) {
                    if (result.d.LoanNameType != "") {
                        var loanTypeName = result.d.LoanNameType
                        if (loanTypeName.toLowerCase().indexOf("housing loan") != -1) {
                            $("#processFeeDrop").show(); //Show Dropdown
                            $('#processFeeText').val(""); //Remove value from Textbox
                            $("#processFeeText").hide(); //Hide Textbox

                            if ((parseFloat($('#loanAmt').val()) >= 1500000)) {
                                $('#processFeeDrop').val(""); //Null
                                $('#processFeeDrop').val("0.5").select();
                            } else if ((parseFloat($('#loanAmt').val()) >= 600000) && (parseFloat($('#loanAmt').val()) < 1500000)) {
                                $('#processFeeDrop').val(""); //Null
                                $('#processFeeDrop').val("0.25").select();
                            } else if ((parseFloat($('#loanAmt').val()) >= 0) && (parseFloat($('#loanAmt').val()) < 600000)) {
                                $('#processFeeDrop').val(""); //Null
                                $('#processFeeDrop').val("0.0").select();
                            }
                        } else if (loanTypeName.toLowerCase().indexOf("security") != -1) {
                            $("#processFeeDrop").show(); //Show Dropdown
                            $('#processFeeText').val(""); //Remove value from Textbox
                            $("#processFeeText").hide(); //Hide Textbox

                            if (($('#loanAmt').val() >= 1500000)) {
                                $('#processFeeDrop').val(""); //Null
                                $('#processFeeDrop').val("0.5").select();
                            } else {
                                $('#processFeeDrop').val("");
                                $("#processFeeDrop").hide(); //Hide Dropdown
                                $("#processFeeText").show(); //Show Textbox

                                if (result.d.ProcessingFee > 0) {
                                    $('#processFeeText').val(result.d.ProcessingFee);
                                } else {
                                    $('#processFeeText').val("0.5");
                                }
                            }
                        } else {
                            $('#processFeeDrop').val("");
                            $("#processFeeDrop").hide(); //Hide Dropdown
                            $("#processFeeText").show(); //Show Textbox

                            if (result.d.ProcessingFee >= 0) {
                                $('#processFeeText').val(result.d.ProcessingFee);
                            } else {
                                $('#processFeeText').val("0.5");
                            }
                        }
                    }
                }
            }
        });
    }
}

// Check Loan Amount Value and Processing Fee Value
function processingFeeAlert() {
    if (($('#processFeeDrop option:selected').val() != "0.5") && (parseFloat($('#loanAmt').val()) >= 1500000) &&
        ($('#plt option:selected').text().toLowerCase().indexOf("housing loan") != -1)) {
        $('#divProFeeAlert').show();
        $('#ProFeeReqAlert').attr("required", true);
    } else if (($('#processFeeDrop option:selected').val() != "0.5") && (parseFloat($('#loanAmt').val()) >= 1500000) &&
        ($('#blt option:selected').text().toLowerCase().indexOf("security") != -1)) {
        $('#divProFeeAlert').show();
        $('#ProFeeReqAlert').attr("required", true);
    } else {
        $('#ProFeeReqAlert').val("");
        $('#ProFeeReqAlert').attr("required", false);
        $('#divProFeeAlert').hide();
    }
}

$('#processFeeDrop').on('change', function() {
    processingFeeAlert();
});

$("#loanAmt").focusout(function() {
    //Call Function to change Processing Fee
    processingFeeDisplay()

    // If Loan Amount value is less than 15L
    // Call Processing Fee Alert function
    if ((parseFloat($('#loanAmt').val()) < 1500000)) {
        processingFeeAlert()
    }
});

// ............... Remove functionality of Dropdown for ROI based on requested on 3rd April ...............//
// $("#RoiDrop").on('change', function(){
//   var roiVal = $("#RoiDrop option:selected").val()
//   $("#interest").val(roiVal)
// });

//Add dropdown value based on Loan Type
// function appendRoiVal(){
//   if (($('#plt option:selected').text().toLowerCase().indexOf("housing loan") != -1 ) &&
//       ($('#PersonalBusiness option:selected').val()=="personal_use")){
//     //Add ROI Value in drop down
//     $("#interest").hide();
//     $("#RoiDrop").show();
//     $('#RoiDrop option[value!=""]').remove();
//     $("#RoiDrop").append('<option value="8.40">8.40</option>');
//     $("#RoiDrop").append('<option value="8.50">8.50</option>');
//     $("#RoiDrop").append('<option value="8.75">8.75</option>');
//     $("#RoiDrop").append('<option value="9">9</option>');
//     $("#RoiDrop").attr("required",true);
//   }else if ((($('#plt option:selected').text().toLowerCase().indexOf("car loan") != -1 ) || 
//             ($('#plt option:selected').text().toLowerCase().indexOf("4 wheeler") != -1 )) &&
//           ($('#PersonalBusiness option:selected').val()=="personal_use") && 
//           ($('#plt option:selected').text().toLowerCase().indexOf("used car") != 0 )){
//     $("#interest").hide();
//     $("#RoiDrop").show();
//     $('#RoiDrop option[value!=""]').remove();
//     $("#RoiDrop").append('<option value="9">9</option>');
//     $("#RoiDrop").append('<option value="9.25">9.25</option>');
//     $("#RoiDrop").append('<option value="9.50">9.50</option>');
//     $("#RoiDrop").attr("required",true);
//   }else{
//     $("#interest").show();
//     $("#RoiDrop").hide();
//     $('#RoiDrop option[value!=""]').remove();
//     $("#RoiDrop").attr("required",false);
//     $("#interest").attr("required",true);
//   }
// }

// $('#EmpType').on('change', function() {
//   if (this.value == 'job(Salaried)') {
//     var amt = $('#loanAmt').val();
// 		$('#actualLimitTxt').text(amt);
//
// 		// var actualamt=$('#actualLimitTxt').text();
// 		// var explmt=$('#ExLimit').text();
// 		if(parseInt($('#actualLimitTxt').text())<=parseInt($('#ExLimit').text()))
// 		{
// 		  $('#LimitStatus').text("Met");
//       $('#LimitStatus').addClass('text-success');
//       $('#LimitStatus').removeClass('text-danger');
// 		}else {
// 		  $('#LimitStatus').text("Not Met");
//       $('#LimitStatus').removeClass('text-success');
//       $('#LimitStatus').addClass('text-danger');
// 		}
//     } else if ($('#EmpType').val() == "business(SelfEmployeed)") {
//       var loanAmt = $('#loanAmt').val();
//       var turnOver = $('#GrossTurnover').val();
//       var totalAssets = $('#TotalAssets').val();
//       var stockDepth = $('#StockBookDepth').val();
//
//       $('#actualLimitTxt').text(loanAmt);
//
//       if (parseFloat(loanAmt) < (5 * parseFloat(turnOver)) && parseFloat(loanAmt) < (0.7 * (parseFloat(totalAssets) + parseFloat(stockDepth)) / 2)) {
//         $('#LimitStatus').text("Met");
//         $('#LimitStatus').addClass('text-success');
//         $('#LimitStatus').removeClass('text-danger');
//       } else {
//         $('#LimitStatus').text("Not Met");
//         $('#LimitStatus').removeClass('text-success');
//         $('#LimitStatus').addClass('text-danger');
//       }
//     }
//   });

function showpay() {
    var loanamt = $('#loanAmt').val();
    var loanmnth = $('#loanMnth').val();
    var loanYear = $('#loanYears').val();
    var roi = $('#interest').val();
    var loanType = $('#plt').val();
    var loanAmtChk = "true";
    var msg = "";

    // Display Expected Limit if loan type is not business use...

    if ($('#PersonalBusiness').val() != 'business_use') {
        $('#actualLimitTxt').text(loanamt);
        if (parseInt($('#actualLimitTxt').text()) <= parseInt($('#ExLimit').text())) {
            $('#LimitStatus').text("Met");
            $('#LimitStatus').addClass('text-success');
            $('#LimitStatus').removeClass('text-danger');
        } else {
            $('#LimitStatus').text("Not Met");
            $('#LimitStatus').removeClass('text-success');
            $('#LimitStatus').addClass('text-danger');
        }
    }

    MarginCal();
    if ($('#PersonalBusiness').val() != 'business_use') {
        RCCriteria();
    }

    if (loanAmtChk == "true") {
        if ((loanamt == null || loanamt.length == 0) || (loanmnth == null || loanmnth.length == 0) &&
            (loanYear == null || loanYear.length == 0) || (roi == null || roi.length == 0)) {
            $('#EMI').val("Incomplete data");
        } else {
            var princ = parseFloat(loanamt);
            var term = parseFloat(loanmnth);
            var termYear = parseFloat(loanYear);
            var roival = parseFloat(roi)
            var intr = roival / 1200;
            if ($('#interestType').val() == "cc_od") {
                // var emiCalVal = princ * intr / (1 - (Math.pow(1 / (1 + intr), term)));
                // var emiCal = term * emiCalVal;
                // var emiCal = princ * (1+((roival/100) * (term/12)))
                var emiCal = princ * (roival / 100) * (termYear);
                var monthlyInterest = emiCal / 12;
                $('#MonthlyInterest').val((monthlyInterest.toFixed(0)));
                $('#TotalPayout').val(princ + emiCal)
            } else {
                var emiCal = princ * intr / (1 - (Math.pow(1 / (1 + intr), term)));
            }
            var finalEMIVal = emiCal.toFixed(0); // to disaply the fixed flaot numbers
            $('#EMI').val(finalEMIVal);
            $('#divEMI').text(finalEMIVal);
        }
    }
    // payment = principle * monthly interest/(1 - (1/(1+MonthlyInterest)*Months))
}

function loanLimitAlert(e) {
    var msg = "";
    msg = "Loan amount should be less than " + e;
    $('#LoanAmtErro').show();
    $('#LoanAmtErro').text(msg);
    $('#EMI').val("");
    $('#LoanAmtErro').fadeIn().fadeOut(3000);
}


// Staff field display hide function
// Fetch Staff related details when loan type contains staff / stf
function StaffFieldDisp() {
    if ((($('#plt option:selected').text().toLowerCase().indexOf("stf") != -1) ||
            ($('#plt option:selected').text().toLowerCase().indexOf("staff") != -1)) &&
        ($('#PersonalBusiness option:selected').val() == "personal_use")) {
        $("#StaffIndexNo").show();
        $("#StaffDesignation").show();
        $("#divGuarantorInfo").show();
        $("#StaffJoinDate").show();
        $("#StaffRetireDate").show();
    } else {
        $("#StaffIndexNo").hide();
        $("#StaffDesignation").hide();
        $("#divGuarantorInfo").hide();
        $("#StaffJoinDate").hide();
        $("#StaffRetireDate").hide();
    }

    // for Staff Housing Loan
    if ((($('#plt option:selected').text().toLowerCase().indexOf("stf") != -1) ||
            ($('#plt option:selected').text().toLowerCase().indexOf("staff") != -1) &&
            ($('#plt option:selected').text().toLowerCase().indexOf("hous") != -1)) &&
        ($('#PersonalBusiness option:selected').val() == "personal_use")) {
        $("#divStaffHouse").show();
    } else {
        $("#divStaffHouse").hide();
    }

    // for Staff Housing Loan
    if ((($('#plt option:selected').text().toLowerCase().indexOf("stf") != -1) ||
        ($('#plt option:selected').text().toLowerCase().indexOf("staff") != -1) &&
        ($('#plt option:selected').text().toLowerCase().indexOf("vehicle") != -1)) &&
        ($('#PersonalBusiness option:selected').val() == "personal_use")) {
            $("#divStaffVehicle").show();
        } else {
            $("#divStaffVehicle").hide();
        }

        // alert(b_year);
        var retiredYear = b_year+58 // 58 age is decided by Banas Bank....
        // var staffRetiredDate = retiredYear

        if ((retiredYear !="") || (retiredYear != "NaN")){
            // console.log(staffRetiredDate)
            var staffRetiredDate = b_date + "/" + b_month + "/" + retiredYear
            $("#DOR").val(staffRetiredDate);
            // $("#DOR").val($.datepicker.formatDate("dd-mm-yy", staffRetiredDate));
            console.log(staffRetiredDate);
        }else {
            $("#DOR").val("");
        }
        
}

// For STaff Vehicle Loan
// Calculation for 85% of Quotation Amount : of Quotation Amount 
// Applicant Gross Monthly Income
$("#QuotationAmt").focusout(function() {
    var quoAmt = $('#QuotationAmt').val();
    var quoAmtPer = quoAmt*0.85;
    $("#QuotationAmtPer").val(quoAmtPer);
});

// Application Basic Info fields are required or optional
function ApplicationInfo(flg) {
    if (flg == "req") {
        $("#divAppInfo :input").attr("required", true);
        $(".opInput").removeAttr("required");
        $("#ProprietorDetailDiv :input").removeAttr("required");
    } else if (flg == "opt") {
        $("#divAppInfo :input").removeAttr("required");
    }
}

// Staff Retirement Date
// function StaffRetiredDate(){
    
    
// } 

// Add function for proprietor Info
// for HP/CC loan
// for Society + Milk related Loan : Display Mandli Name

$('#PersonalBusiness').on('change', function() {
    if (this.value == 'personal_use') {
        $("#ProprietorDetailDiv").hide();
        $("#DivPacsName").hide();
    } else if (this.value == 'business_use') {
        if (($('#blt option:selected').text().toLowerCase().indexOf("cash credit") != -1) ||
            ($('#blt option:selected').text().toLowerCase().indexOf("hypothecation") != -1)) {
            $("#ProprietorDetailDiv").show();
            $("#DivPacsName").hide();
        } else if (($('#blt option:selected').text().toLowerCase().indexOf("society") != -1) ||
            ($('#blt option:selected').text().toLowerCase().indexOf("soc") != -1) ||
            ($('#blt option:selected').text().toLowerCase().indexOf("milk") != -1)) {
            $("#ProprietorDetailDiv").hide();
            $("#DivPacsName").show();
        } else {
            $("#ProprietorDetailDiv").hide();
            $("#DivPacsName").hide();
        }
    }
});

$('#blt').on('change', function() {
    if ($("#PersonalBusiness").val() == 'business_use') {
        if (($('#blt option:selected').text().toLowerCase().indexOf("cash credit") != -1) ||
            ($('#blt option:selected').text().toLowerCase().indexOf("hypothecation") != -1)) {
            $("#ProprietorDetailDiv").show();
        } else {
            $("#ProprietorDetailDiv").hide();
        }

        if (($('#blt option:selected').text().toLowerCase().indexOf("society") != -1) ||
            ($('#blt option:selected').text().toLowerCase().indexOf("soc") != -1) ||
            ($('#blt option:selected').text().toLowerCase().indexOf("milk") != -1)) {
            $("#ProprietorDetailDiv").hide();
            $("#DivPacsName").show();
        } else {
            $("#DivPacsName").hide();
        }
    }
});

$(document).ready(function() {
    // Displaying New Mortgage Section
    $("#divAddNewSection").click(function() {
        $("#divRemoveNewSection").show();
        $("#divNewMortgageSection").show();
        $("#divAddNewSection").hide();
    });

    $('#divRemoveNewSection').click(function() {
        $("#divNewMortgageSection").hide();
        $("#divRemoveNewSection").hide();
        $("#divAddNewSection").show();
        // this will clear all input data for new mortgage section
        $('#divNewMortgageSection').find('input:text').val('');
        MarginCal();
    });

    // Displaying First Co-Applicant Section
    $("#divAddNewCoAppSection").click(function() {
        $("#divNewCoAppSection").show();
        $("#divRemoveNewCoAppSection").show();
        $("#divAddAnotherCoAppSection").show();
        $("#divAddNewCoAppSection").hide();
        $("#divRemoveAnotherCoAppSection").hide();
    });

    $('#divRemoveNewCoAppSection').click(function() {
        $("#divRemoveNewCoAppSection").hide();
        $("#divNewCoAppSection").hide();
        $("#divAnotherCoAppSection").hide();
        $("#divAddNewCoAppSection").show();
        // this will clear all input data for First Co-Applicant section
        $('#divNewCoAppSection').find('input:text').val('');
        $('#divAnotherCoAppSection').find('input:text').val('');
        RCCriteria();
    });

    // Displaying Second Co-Applicant Section
    $("#divAddAnotherCoAppSection").click(function() {
        $("#divAnotherCoAppSection").show();
        $("#divRemoveAnotherCoAppSection").show();
        $("#divAddAnotherCoAppSection").hide();
    });

    $('#divRemoveAnotherCoAppSection').click(function() {
        $("#divRemoveAnotherCoAppSection").hide();
        $("#divAnotherCoAppSection").hide();
        $("#divAddAnotherCoAppSection").show();
        // this will clear all input data for Second Co-Applicant section
        $('#divAnotherCoAppSection').find('input:text').val('');
        RCCriteria();
    });

    //Calculate Age
    $('#DOB').datepicker()
        .on("change", function(e) {
            var bddt = $(this).val();
            var parts = bddt.split('/'); // Example : 31/12/1999(dd/mm/yyyy)
            // Please put attention to the month (parts[1]), Javascript counts months from 0:
            // January - 0, February - 1, etc
            var bDt = new Date(parts[2], parts[1] - 1, parts[0]);

            var d = new Date();
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1;
            var curr_year = d.getFullYear();

            b_date = bDt.getDate();
            b_month = bDt.getMonth() + 1;
            b_year = bDt.getFullYear();

            var age = curr_year - b_year;

            if (curr_month < b_month || curr_month == b_month && curr_date < b_date) {
                age--;
            }
            if ($('#PersonalBusiness').val() != 'business_use') {
                $('#actualAge').html(age);
                $('#actualAge').val(age);

                if (age <= $('#ExAge').text()) {
                    $('#AgeStatus').text("Met");
                    $('#AgeStatus').removeClass('text-danger');
                    $('#AgeStatus').addClass('text-success');
                } else {
                    $('#AgeStatus').text("Not Met");
                    $('#AgeStatus').removeClass('text-success');
                    $('#AgeStatus').addClass('text-danger');
                }
            }
            // console.log(age);
            StaffFieldDisp(); // Function Call on change event of DOB....
        });

    var phCheckFlg = false;
    var co1PhCheckFlg = false;
    var co2PhCheckFlg = false;
    var panCheckFlg = false;
    var co1PanCheckFlg = false;
    var co2PanCheckFlg = false;

    //For Applicant Mobile number should start with only 7,8,9
    $("#PhNo").keyup(function(e) {
        var mobile = $.trim($(this).val());
        if (mobile != "") {
            var regx = /^[6-9]\d{9}$/;
            if (!regx.test(mobile)) {
                $("#pherror").show();
                $("#pherror").html("(Mobile no. start with 6/7/8/9.)");
                phCheckFlg = true;
                return;
            } else {
                phCheckFlg = false;
                $("#pherror").hide();
            }
        }
    });

    //For First Co-Applicant Mobile number should start with only 7,8,9
    $("#CoApp1PhNo").keyup(function(e) {
        var mobile = $.trim($(this).val());
        if (mobile != "") {
            var regx = /^[6-9]\d{9}$/;
            if (!regx.test(mobile)) {
                $("#CoApp1pherror").show();
                $("#CoApp1pherror").html("(Mobile no. start with 6/7/8/9.)");
                co1PhCheckFlg = true;
                return;
            } else {
                co1PhCheckFlg = false;
                $("#CoApp1pherror").hide();
            }
        }
    });

    //For First Co-Applicant Mobile number should start with only 7,8,9
    $("#CoApp2PhNo").keyup(function(e) {
        var mobile = $.trim($(this).val());
        if (mobile != "") {
            var regx = /^[6-9]\d{9}$/;
            if (!regx.test(mobile)) {
                $("#CoApp2pherror").show();
                $("#CoApp2pherror").html("(Mobile no. start with 6/7/8/9.)");
                co2PhCheckFlg = true;
                return;
            } else {
                co2PhCheckFlg = false;
                $("#CoApp2pherror").hide();
            }
        }
    });

    //Pan Format Checking For Applicant (i.e First 5char+4number+1char. Ex: ASDFG7890Q)
    $("#PanNo").keyup(function(e) {
        var panStr = $.trim($(this).val());
        if (panStr != "") {
            var regx = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
            if (!regx.test(panStr)) {
                $("#panError").show();
                $("#panError").html("(Enter Valid Pan Number.)");
                panCheckFlg = true;
                return;
            } else {
                panCheckFlg = false;
                $("#panError").hide();
            }
        }
    });

    //Pan Format Checking For First Co-Applicant (i.e First 5char+4number+1char. Ex: ASDFG7890Q)
    $("#CoApp1PanNo").keyup(function(e) {
        var panStr = $.trim($(this).val());
        if (panStr != "") {
            var regx = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
            if (!regx.test(panStr)) {
                $("#CoApp1panError").show();
                $("#CoApp1panError").html("(Enter Valid Pan Number.)");
                co1PanCheckFlg = true;
                return;
            } else {
                co1PanCheckFlg = false;
                $("#CoApp1panError").hide();
            }
        }
    });

    //Pan Format Checking For second Co-Applicant (i.e First 5char+4number+1char. Ex: ASDFG7890Q)
    $("#CoApp2PanNo").keyup(function(e) {
        var panStr = $.trim($(this).val());
        if (panStr != "") {
            var regx = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
            if (!regx.test(panStr)) {
                $("#CoApp2panError").show();
                $("#CoApp2panError").html("(Enter Valid Pan Number.)");
                co2PanCheckFlg = true;
                return;
            } else {
                co2PanCheckFlg = false;
                $("#CoApp2panError").hide();
            }
        }
    });

    $('#btnfinalSubmit').click(function() {
        var required = false;
        $("#FormLoan [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            }
        });
        // console.log("phCheckFlg", phCheckFlg);
        // console.log("coPhCheckFlg", coPhCheckFlg);
        // console.log("panCheckFlg", panCheckFlg);

        if (phCheckFlg == true) {
            $('#ASubmitError').show();
            $('#ASubmitError').html("Enter Valid Mobile Number, start with 6/7/8/9.");
            return;
        }

        if (panCheckFlg == true) {
            $('#ASubmitError').show();
            $('#ASubmitError').html("Enter Valid Pan Number.");
            return;
        }

        if ($('#CoApp1Name').val != "") {
            if (co1PhCheckFlg == true) {
                $('#ASubmitError').show();
                $('#ASubmitError').html("First Co-Applicant - Enter Valid Mobile Number, start with 6/7/8/9.");
                return;
            }

            if (co1PanCheckFlg == true) {
                $('#ASubmitError').show();
                $('#ASubmitError').html("First Co-Applicant - Enter Valid Pan Number.");
                return;
            }
        }

        if ($('#CoApp2Name').val != "") {
            if (co2PhCheckFlg == true) {
                $('#ASubmitError').show();
                $('#ASubmitError').html("Second Co-Applicant - Enter Valid Mobile Number, start with 6/7/8/9.");
                return;
            }

            if (co2PanCheckFlg == true) {
                $('#ASubmitError').show();
                $('#ASubmitError').html("Second Co-Applicant - Enter Valid Pan Number.");
                return;
            }
        }

        if (required == true) {
            $('#ASubmitError').show();
            $('#ASubmitError').html("Required fields information are missing inside Loan Request/Applicant Basic Information. Please click to view errors!!!");
            return;
        } else {
            $('#ASubmitError').hide();

            if ($('#PersonalBusiness').val() != 'business_use') {
                limitAlertStatus();
            }

            // Eligibility Status Display
            if ($('#LimitStatus').text() == "Not Met") {
                $('#limitEligible').text("Actual Limit Eligibility Not Met");
                $('#limitEligible').removeClass('text-success');
                $('#limitEligible').addClass('text-danger');
            } else {
                $('#limitEligible').text("Actual Limit Eligibility Met");
                $('#limitEligible').addClass('text-success');
                $('#limitEligible').removeClass('text-danger');
            }
            if ($('#MarginStatus').text() == "Not Met") {
                $('#marginEligible').text("Actual Margin Eligibility Not Met");
                $('#marginEligible').removeClass('text-success');
                $('#marginEligible').addClass('text-danger');
            } else {
                $('#marginEligible').text("Actual Margin Eligibility Met");
                $('#marginEligible').addClass('text-success');
                $('#marginEligible').removeClass('text-danger');
            }
            if ($('#AgeStatus').text() == "Not Met") {
                $('#ageEligible').text("Age Eligibility Not Met");
                $('#ageEligible').removeClass('text-success');
                $('#ageEligible').addClass('text-danger');
            } else {
                $('#ageEligible').text("Age Eligibility Met");
                $('#ageEligible').removeClass('text-danger');
                $('#ageEligible').addClass('text-success');
            }
            if ($('#IncomeStatus').text() == "Not Met") {
                $('#incomeEligible').text("Income Eligibility Not Met");
                $('#incomeEligible').removeClass('text-success');
                $('#incomeEligible').addClass('text-danger');
            } else if ($('#IncomeStatus').text() == "On the basis of Income Tax Return") {
                $('#incomeEligible').text("On the basis of Income Tax Return");
            } else {
                $('#incomeEligible').text("Income Eligibility Met");
                $('#incomeEligible').addClass('text-success');
                $('#incomeEligible').removeClass('text-danger');
            }

            if ($('#PersonalBusiness').val() != 'business_use') {
                RCCriteria();
            }

            $("#loan-modal").modal();
        }
    });

    $('#PersonalBusiness').on('change', function() {
        if (this.value == 'personal_use') {
            var ccod_term_check = $('#interestType').val();
            if (ccod_term_check != "") {
                // console.log("1", ccod_term_check);
                var new_val = $('#interestType').val('');
                // console.log("2",new_val);
            }
            $('#personalLoan').show();
        } else {
            $('#personalLoan').hide();
        }
        StaffFieldDisp(); // Call Function to show and get staff related info.
    });

    $('#personalLoan').on('change', function() {
        if (this.value != '') {
            $('#loanAmt').removeAttr("disabled");
        }
    });

    $('#businessLoan').on('change', function() {
        if (this.value != '') {
            $('#loanAmt').removeAttr("disabled");
        }
    });

    $('#PersonalBusiness').on('change', function() {
        if (this.value == 'business_use') {
            $('#businessLoan').show();
            $('#applicationType').show();
            $('#divinterestType').show();
            $('#EmpType').find('option:contains(Job (Salaried))').hide();
            $('#CoApp1EmpType').find('option:contains(Job (Salaried))').hide();
            $('#CoApp2EmpType').find('option:contains(Job (Salaried))').hide();

            // if business use is selected set status as Met and set actual value as As Per Appraisal
            $('#LimitStatus').text("Met").addClass('text-success').removeClass('text-danger');
            $('#MarginStatus').text("Met").addClass('text-success').removeClass('text-danger');
            $('#AgeStatus').text("Met").addClass('text-success').removeClass('text-danger');
            $('#IncomeStatus').text("Met").addClass('text-success').removeClass('text-danger');
            $('#actualAge').text("As Per Appraisal");
            $('#actualMargin').text("As Per Appraisal");
            $('#actualLimitTxt').text("As Per Appraisal");
            $('#actualIncome').text("As Per Appraisal");
        } else {
            $('#businessLoan').hide();
            $('#applicationType').hide();
            $('#divinterestType').hide();
            $('#EmpType').find('option:contains(Job (Salaried))').show();
            $('#CoApp1EmpType').find('option:contains(Job (Salaried))').show();
            $('#CoApp2EmpType').find('option:contains(Job (Salaried))').show();

            // if personal use is selected calculate eligibility criteria
            $('#LimitStatus').text("Not Met").addClass('text-danger').removeClass('text-success');
            $('#MarginStatus').text("Not Met").addClass('text-danger').removeClass('text-success');
            $('#AgeStatus').text("Not Met").addClass('text-danger').removeClass('text-success');
            $('#IncomeStatus').text("Not Met").addClass('text-danger').removeClass('text-success');
            $('#DOB').val('');
            $('#loanAmt').val('');
            $('#Propvalue').val('');
            $('#APropvalue1').val('');
            $('#AnnIncome').val('');
            $('#NMI').val('');
            $('#TotalLoanEMI').val('');
            //If Co-Applicant income consider...
            // $('#CoApp1AnnIncome').val('');
            // $('#CoApp1NMI').val('');
            // $('#CoApp1TotalLoanEMI').val('');
            // $('#coapp2annualIncome').val('');
            // $('#coapp2netMnthlyIncome').val('');
            // $('#CoApp2TotalLoanEMI').val('');
            $('#actualAge').text("");
            $('#actualMargin').text("");
            $('#actualLimitTxt').text("");
            $('#actualIncome').text("");
        }
        if ($('#interestType').val() == "cc_od") {
            $('#emi').hide();
            $('#divMonthPeriod').hide();
            $('#annualinterest').show();
            $('#divYearPeriod').show();
            $('#divMonthlyInterest').show();
            $('#divTotalPay').show();
        } else {
            $('#emi').show();
            $('#divMonthPeriod').show();
            $('#annualinterest').hide();
            $('#divYearPeriod').hide();
            $('#divMonthlyInterest').hide();
            $('#divTotalPay').hide();
        }

    });

    $('#interestType').on('change', function() {
        if (this.value == 'cc_od') {
            $('#emi').hide();
            $('#divMonthPeriod').hide();
            $('#annualinterest').show();
            $('#divYearPeriod').show();
            $('#divMonthlyInterest').show();
            $('#divTotalPay').show();
        } else {
            $('#emi').show();
            $('#divMonthPeriod').show();
            $('#annualinterest').hide();
            $('#divYearPeriod').hide();
            $('#divMonthlyInterest').hide();
            $('#divTotalPay').hide();
        }
    });

    // Applicant OtherLoanFlag
    $('#OtherLoanFlag').on('change', function() {
        if ($('#PersonalBusiness').val() != 'business_use') {
            RCCriteria();
        }
        if (this.value == '1') {
            $('#loanEmi').show();
            $('#emiRemarks').show();
        } else {
            $('#loanEmi').hide();
            $('#emiRemarks').hide();
        }
    });

    // First Co-Applicant OtherLoanFlag
    $('#CoApp1OtherLoanFlag').on('change', function() {
        // RCCriteria();
        if (this.value == '1') {
            $('#CoApp1loanEmi').show();
            $('#CoApp1emiRemarks').show();
        } else {
            $('#CoApp1loanEmi').hide();
            $('#CoApp1emiRemarks').hide();
        }
    });

    // Second Co-Applicant OtherLoanFlag
    $('#CoApp2OtherLoanFlag').on('change', function() {
        // RCCriteria();
        if (this.value == '1') {
            $('#CoApp2loanEmi').show();
            $('#CoApp2emiRemarks').show();
        } else {
            $('#CoApp2loanEmi').hide();
            $('#CoApp2emiRemarks').hide();
        }
    });

    $("#TotalLoanEMI").focusout(function() {
        if ($('#PersonalBusiness').val() != 'business_use') {
            RCCriteria();
        }
    });

    $('#FormLoan').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormLoan [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        var limitStatusTxt = $('#LimitStatus').text();
        var marginStatusTxt = $('#MarginStatus').text();
        var ageStatusTxt = $('#AgeStatus').text();
        var incomeStatusTxt = $('#IncomeStatus').text();
        var marginVal = $('#actualMargin').text();

        $.ajax({
            method: 'POST',
            url: '/add-loan-info?limitTxt=' + limitStatusTxt + '&marginTxt=' + marginStatusTxt + '&ageTxt=' + ageStatusTxt + '&incomeTxt=' + incomeStatusTxt + '&loanMargin=' + marginVal,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#processing").hide();
                if (result.s.c == 0) {
                    // window.location.href = "/loan-form";
                    $("#loan-modal").modal('toggle') // close the modal
                    $('#ASubmitSuccess').show();
                    $('#ASubmitSuccess').html("Submitted successfully. New Loan Case ID is: " + result.d + "!!!");
                }
            }
        });
    });

    $('.btnloansubmit').click(function() {
        $("#processing").show();
        $('#FormLoan').submit();
    })

    // Applicant Employment Type
    $('#EmpType').on('change', function() {
        if (this.value == 'business(SelfEmployeed)') {
            $('#divAssets').show();
            $('#divTurnover').show();
            $('#divDepth').show();
        } else {
            $('#divAssets').hide();
            $('#divTurnover').hide();
            $('#divDepth').hide();
        }
    });

    // First Co-Applicant Employment Type
    $('#CoApp1EmpType').on('change', function() {
        if (this.value == 'business(SelfEmployeed)') {
            $('#divCoApp1Assets').show();
            $('#divCoApp1Turnover').show();
            $('#divCoApp1Depth').show();
        } else {
            $('#divCoApp1Assets').hide();
            $('#divCoApp1Turnover').hide();
            $('#divCoApp1Depth').hide();
        }
    });

    // Second Co-Applicant Employment Type
    $('#CoApp2EmpType').on('change', function() {
        if (this.value == 'business(SelfEmployeed)') {
            $('#divCoApp2Assets').show();
            $('#divCoApp2Turnover').show();
            $('#divCoApp2Depth').show();
        } else {
            $('#divCoApp2Assets').hide();
            $('#divCoApp2Turnover').hide();
            $('#divCoApp2Depth').hide();
        }
    });

    // Applicant Relationship with BAnk
    $('#RelWithBank').on('change', function() {
        if (this.value == 'No_Relationship') {
            $('#AccountNum').hide();
        } else {
            $('#AccountNum').show();
        }
    });

    // First Co-Applicant Relationship with Bank
    $('#CoApp1RelWithBank').on('change', function() {
        if (this.value == 'No_Relationship') {
            $('#CoApp1AccountNum').hide();
        } else {
            $('#CoApp1AccountNum').show();
        }
    });

    // Second Co-Applicant Relationship with Bank
    $('#CoApp2RelWithBank').on('change', function() {
        if (this.value == 'No_Relationship') {
            $('#CoApp2AccountNum').hide();
        } else {
            $('#CoApp2AccountNum').show();
        }
    });

    $('#plt').on('change', function() {
        var lonetypeId = $('#plt').val();
        $('#table-eligibility').show();

        processingFeeDisplay(); //Call Function to change Processing Fee
        processingFeeAlert(); //Call Function to show / hide Request Remark Input
        // ............... Remove functionality of Dropdown for ROI based on requested on 3rd April ...............//
        // appendRoiVal(); //Call Function to append value in ROI Dropdown
        StaffFieldDisp(); // Call Function to show and get staff related info.


        $.ajax({
            method: 'GET',
            url: '/get-roi-val?loanTypeId=' + lonetypeId,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#processing").hide();
                if (result.s.c == 0) {
                    if (result.d.RoiRate > 0) {
                        $('#interest').val(result.d.RoiRate);
                        // $('#actualMargin').text(result.d.RoiRate);
                    } else {
                        $('#interest').val("10");
                        // $('#actualMargin').text("10");
                    }
                }
            }
        });

        $.ajax({
            method: 'GET',
            url: '/get-app-info-flg?loanTypeId=' + lonetypeId,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#processing").hide();
                if (result.s.c == 0) {
                    if (result.d.ApplicantInfoFlg != "") {
                        applicantInfoFlgVal = (result.d.ApplicantInfoFlg);
                        ApplicationInfo(applicantInfoFlgVal);
                    } else {
                        applicantInfoFlgVal = "req";
                        ApplicationInfo(applicantInfoFlgVal);
                    }
                }
            }
        });


        $.ajax({
            method: 'GET',
            url: '/eligibility-data?loanTypeId=' + lonetypeId,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#processing").hide();
                if (result.s.c == 0) {
                    if (result.d.LoanLimit > 0) {
                        $('#ExLimit').text(result.d.LoanLimit);
                    }
                    if (result.d.LoanMargin > 0) {
                        $('#ExMargin').text(result.d.LoanMargin);
                    }
                    if (result.d.Income > 0) {
                        // $('#ExIncome').text(result.d.Income);
                    }
                    if (result.d.Age > 0) {
                        $('#ExAge').text(result.d.Age);
                    }
                    if (result.d.IncomeCriteria != "") {
                        $('#IncomeDetail').text(result.d.IncomeCriteria);
                    }
                    if (result.d.MinIncome > 0) {
                        $('#MinIncome').text(result.d.MinIncome);
                    }
                    if (result.d.MinEmi > 0) {
                        $('#MinEmi').text(result.d.MinEmi);
                    }
                    if (result.d.LessIncome > 0) {
                        $('#LessIncome').text(result.d.LessIncome);
                    }
                    if (result.d.GreaterIncome > 0) {
                        $('#GreaterIncome').text(result.d.GreaterIncome);
                    }
                    if (result.d.BetweenEmi > 0) {
                        $('#BetweenEmi').text(result.d.BetweenEmi);
                    }
                    if (result.d.AboveIncome > 0) {
                        $('#AboveIncome').text(result.d.AboveIncome);
                    }
                    if (result.d.AboveEmi > 0) {
                        $('#AboveEmi').text(result.d.AboveEmi);
                    }
                    if (result.d.LoanNameType != "") {
                        loanName = result.d.LoanNameType;
                    }
                    if (result.d.Alert != "") {
                        $('#AlertDetail').show();
                        var msg = "(" + result.d.Alert + ")";
                        $('#AlertDetail').html(msg);
                    } else {
                        $('#AlertDetail').hide();
                    }
                }
            }
        });
    });

    $('#blt').on('change', function() {
        var lonetypeId = $('#blt').val();
        $('#table-eligibility').show();

        processingFeeDisplay(); //Call Function to change Processing Fee
        processingFeeAlert(); //Call Function to show / hide Request Remark Input
        // ............... Remove functionality of Dropdown for ROI based on requested on 3rd April ...............//
        // appendRoiVal(); //Call Function to append value in ROI Dropdown
        StaffFieldDisp(); // Call Function to show and get staff related info.

        $.ajax({
            method: 'GET',
            url: '/get-roi-val?loanTypeId=' + lonetypeId,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#processing").hide();
                if (result.d.RoiRate > 0) {
                    $('#interest').val(result.d.RoiRate);
                } else {
                    $('#interest').val("10");
                }
            }
        });
        $.ajax({
            method: 'GET',
            url: '/eligibility-data?loanTypeId=' + lonetypeId,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#processing").hide();
                if (result.s.c == 0) {
                    if (result.d.LoanLimit > 0) {
                        $('#ExLimit').text(result.d.LoanLimit);
                    }
                    if (result.d.LoanMargin > 0) {
                        $('#ExMargin').text(result.d.LoanMargin);
                    }
                    if (result.d.Income > 0) {
                        // $('#ExIncome').text(result.d.Income);
                    }
                    if (result.d.Age > 0) {
                        $('#ExAge').text(result.d.Age);
                    }
                    if (result.d.IncomeCriteria != "") {
                        $('#IncomeDetail').text(result.d.IncomeCriteria);
                    }
                    if (result.d.MinIncome > 0) {
                        $('#MinIncome').text(result.d.MinIncome);
                    }
                    if (result.d.MinEmi > 0) {
                        $('#MinEmi').text(result.d.MinEmi);
                    }
                    if (result.d.LessIncome > 0) {
                        $('#LessIncome').text(result.d.LessIncome);
                    }
                    if (result.d.GreaterIncome > 0) {
                        $('#GreaterIncome').text(result.d.GreaterIncome);
                    }
                    if (result.d.BetweenEmi > 0) {
                        $('#BetweenEmi').text(result.d.BetweenEmi);
                    }
                    if (result.d.AboveIncome > 0) {
                        $('#AboveIncome').text(result.d.AboveIncome);
                    }
                    if (result.d.AboveEmi > 0) {
                        $('#AboveEmi').text(result.d.AboveEmi);
                    }
                    if (result.d.LoanNameType != "") {
                        loanName = result.d.LoanNameType;
                    }
                    if (result.d.Alert != "") {
                        $('#AlertDetail1').show();
                        var msg = "(" + result.d.Alert + ")";
                        $('#AlertDetail1').html(msg);
                    } else {
                        $('#AlertDetail1').hide();
                    }
                }
            }
        });
        $.ajax({
            method: 'GET',
            url: '/get-app-info-flg?loanTypeId=' + lonetypeId,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#processing").hide();
                if (result.s.c == 0) {
                    if (result.d.ApplicantInfoFlg != "") {
                        applicantInfoFlgVal = (result.d.ApplicantInfoFlg);
                        ApplicationInfo(applicantInfoFlgVal);
                    } else {
                        applicantInfoFlgVal = "req";
                        ApplicationInfo(applicantInfoFlgVal);
                    }
                }
            }
        });
    });

    // Applicant Gross Monthly Income
    $("#AnnIncome").focusout(function() {
        var annual = $('#AnnIncome').val();
        var monthly = (annual / 12).toFixed(0);
        $('#NMI').val(monthly);
        if ($('#PersonalBusiness').val() != 'business_use') {
            $('#actualIncome').text(annual);
            RCCriteria();
        }
    });

    // First Co-Applicant Gross Monthly Income
    $("#CoApp1AnnIncome").focusout(function() {
        var annual = $('#CoApp1AnnIncome').val();
        var monthly = (annual / 12).toFixed(0);
        $('#CoApp1NMI').val(monthly);
        if ($('#PersonalBusiness').val() != 'business_use') {
            RCCriteria();
        }
    });

    // Second Co-Applicant Gross Monthly Income
    $("#CoApp2AnnIncome").focusout(function() {
        var annual = $('#CoApp2AnnIncome').val();
        var monthly = (annual / 12).toFixed(0);
        $('#CoApp2NMI').val(monthly);
        if ($('#PersonalBusiness').val() != 'business_use') {
            RCCriteria();
        }
    });

    // This for First Mortgage Section
    $('#ProType').on('change', function() {
        if (this.value == 'Vehicle') {
            $('#divOwner').hide();
            $('#propertyDetailLabel').hide();
            $('#propertyValLabel').hide();
            $('#divSeller').show();
            $('#showroomPriceLabel').show();
            $('#Propvalue').attr("placeholder", "Enter Ex-Showroom Price");
            $('#makeModelLabel').show();
            $("#PropDetails").attr("placeholder", "Enter Make and Model");
            $('#divProDetail').show();
            $('#divProVal').show();
        } else {
            $('#divOwner').show();
            $('#propertyDetailLabel').show();
            $('#propertyValLabel').show();
            $('#divProDetail').show();
            $('#divProVal').show();
            $('#divSeller').hide();
            $('#showroomPriceLabel').hide();
            $('#Propvalue').attr("placeholder", "Enter Total Property Value");
            $('#makeModelLabel').hide();
            $("#PropDetails").attr("placeholder", "Enter Property Details");
        }
    });

    // This for Second Mortgage Section
    $('#AProType1').on('change', function() {
        if (this.value == 'Vehicle') {
            $('#divOwner1').hide();
            $('#propertyDetailLabel1').hide();
            $('#propertyValLabel1').hide();
            $('#divSeller1').show();
            $('#showroomPriceLabel1').show();
            $('#APropvalue1').attr("placeholder", "Enter Ex-Showroom Price");
            $('#makeModelLabel1').show();
            $("#PropDetails1").attr("placeholder", "Enter Make and Model");
            $('#divProDetail1').show();
            $('#divProVal1').show();
        } else {
            $('#divOwner1').show();
            $('#propertyDetailLabel1').show();
            $('#propertyValLabel1').show();
            $('#divProDetail1').show();
            $('#divProVal1').show();
            $('#divSeller1').hide();
            $('#showroomPriceLabel1').hide();
            $('#APropvalue1').attr("placeholder", "Enter Total Property Value");
            $('#makeModelLabel1').hide();
            $("#PropDetails1").attr("placeholder", "Enter Property Details");
        }
    });

});