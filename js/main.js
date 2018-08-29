//Ryan Emslie submission of Project 3
//I am attempting the "Exceeds Expectation"
//Extra Credit for T-shirt, Line 49
//Extra Credit - Conditional Error, Line 178
//Extra Credit - Real Time Error, Line 22


const checkbox = $( 'input:checkbox' );
$('<label id="priceLabel"></label>').appendTo( $('.activities'));
$('#paypal').hide();
$('#bitcoin').hide();
$('#colors-js-puns').hide();


//********REQUIRED FOR ASSIGNMENT**********
//*************SET FOCUS*******************
//Sets the initial focus to the Name input box
$('#name').focus();

//*************REQUIRED FOR EXTRA CREDIT*****************
//*********REAL TIME FEEDBACK WHEN ENTERING NAME*********
$( '#name' ).on('input', function() {
    $('#nameHint').hide()
    $('#name').removeClass('not-valid')
    if ( $('#name').val().length < 3 && $('#name').val().length > 0) {
        $('#nameHint').text('Your name must be at least three letters long').css('color', 'red')
        $('#nameHint').show()
        $('#name').addClass('not-valid')
        } 
});

//********REQUIRED FOR ASSIGNMENT**********
//Hides hard coded HTML input for Job Role - input appears without JS
$('#other-title').hide();

 //*************REQUIRED FOR ASSIGNMENT*****************
 //******************JOB ROLE***************************
//Function displays input box when Job Role of Other is selected
$( "#title" ).change(function() {
    if ( $( "#title").find(":selected").val() === 'other' ) {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});

//*************REQUIRED FOR ASSIGNMENT*****************
//*****************T-SHIRT INFO************************
//Function displays only the colors for the specific design
$( "#design" ).change(function() {
    //*************REQUIRED FOR EXTRA CREDIT***********
    $('#colors-js-puns').show();
    //hides id=color that contains JS
    $('#color').find('option:contains("JS")').hide();
    if ( $('#design').val() === 'js puns' ) {
        $('#color').find('option:contains("JS Puns shirt only")').show();
    } else if ( $('#design').val() === 'heart js' ) {
        $('#color').find('option:contains("JS shirt only")').show();
    }
});

//*************REQUIRED FOR ASSIGNMENT*****************
//GRADING NOTE - NOTE SURE IF INSTRUCTIONS MEANT MAIN CONFERENCE WAS MANDATORY
//*************REGISTER FOR ACTIVITIES*****************
//Function only allows now conflicting checkbox times
checkbox.change(function() {
  checkbox.prop('disabled', false);
  $('.activities label').css('color', "black");
  if ( $('[name="js-frameworks"]').prop("checked") == true ) {
      $('[name="express"]').prop('disabled', true)
      $( ".activities label:nth-child(5)" ).css( "color", "gray" );
  }
    else if ( $('[name="express"]').prop("checked") == true ) {
      $('[name="js-frameworks"]').prop('disabled', true)
      $( ".activities label:nth-child(3)" ).css( "color", "gray" );
      }

  if ( $('[name="js-libs"]').prop("checked") == true ) {
      $('[name="node"]').prop('disabled', true)
      $( ".activities label:nth-child(6)" ).css( "color", "gray" );
  }
    else if ( $('[name="node"]').prop("checked") == true ) {
      $('[name="js-libs"]').prop('disabled', true)
      $( ".activities label:nth-child(4)" ).css( "color", "gray" );
      }
      numChecked();
});

//*************REQUIRED FOR ASSIGNMENT*****************
//*************REGISTER FOR ACTIVITIES*****************
//Function calculates number of activites selected and calculates prince in new <label>
function numChecked () {
  let count = 0;
  let price = 0;
  let mainPrice = 0;

  for ( let i = 1; i < checkbox.length; i++ ) {
    let test = $('.activities input:checkbox');
    
      if (test[i].checked == true) {
      count = count + 1;
        
    }
  }

  if ( checkbox[0].checked ) {
        mainPrice = 200;
    } 
    price = (count * 100)
  $('#priceLabel').text('Total: $' + (price + mainPrice)) ;
  return (price + mainPrice);
}

//*************REQUIRED FOR ASSIGNMENT*****************
//**************PAYMENT INFORMATION********************
//Function displays only the payment method selected from dropdown
$( "#payment" ).change(function() {
    $('#credit-card').show();
    $('#paypal').show();
    $('#bitcoin').show();

    if ( $('#payment').val() === 'credit card' ) {
      $('#paypal').hide();
      $('#bitcoin').hide();
    }
    if ( $('#payment').val() === 'paypal' ) {
      $('#credit-card').hide();
      $('#bitcoin').hide();
    }
    if ( $('#payment').val() === 'bitcoin' ) {
      $('#credit-card').hide();
      $('#paypal').hide();
    }
});

//*************REQUIRED FOR ASSIGNMENT*****************
//****************FORM VALIDATION**********************
function formValidation() {
    
    $('#errorList li').remove()
    
   function removeClassNotValid() {
       $('input').removeClass('not-valid');
       $('select').removeClass('not-valid');
       $('.activities legend').removeClass('not-valid');
       
   };
    
    function nameValidation() {
        if ( $('#name').val().length < 3 ) {
            event.preventDefault()
            //$('#name').focus();
            $('#name').addClass('not-valid');
              //$('#name').css("borderColor", "red")
            $('<li>Please Enter Your Name</li>').appendTo( $('#errorList') )
          }
    };
    
    function emailValidation() {
        if ( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(mail.value )) {
        } else {
            $('#mail').addClass('not-valid');
            $('<li>Please A Vaild Email</li>').appendTo( $('#errorList') )
        }
    };

        
    function activityValidation() {
        $(':checkbox').checked;  
        if ( numChecked() === 0 ) {
            $("#errorList").append("<li>Please Select at Least One Activity");
            $('.activities legend').addClass('not-valid')
            $('#priceLabel').addClass('not-valid')
        }
    };    
        
        
//*************REQUIRED FOR EXTRA CREDIT - CONDITIONAL ERROR MESSAGE - CVV*****************     
    function ccValidation() {
        if ( $("[value='credit card']").is(':checked') ) {
          if ( /^[0-9]{13,16}$/.test(ccNum.value) == false) {
            $("#errorList").append("<li>Please enter a proper Credit Card Number</li>");
            $('#ccNum').addClass('not-valid');
          }
          if ( /^[0-9]{5}$/.test(zip.value) == false) {
            $("#errorList").append("<li>Please Enter Proper Five Digit Zip Code</li>");
            $('#zip').addClass('not-valid'); 
          }
        
            if ( $('#cvv').val().length < 3 ) {
                $("#errorList").append("<li>The Credit Card - CVV You Entered Has Too Few Numbers</li>")
                $('#cvv').addClass('not-valid');
            } else if ($('#cvv').val().length > 3 ) {
                $("#errorList").append("<li>The Credit Card - CVV You Entered Has Too Many Numbers</li>")
                $('#cvv').addClass('not-valid');
            }
  
  
        }
    };
    
    removeClassNotValid();  
    nameValidation();
    emailValidation();
    activityValidation();
    ccValidation();
    $('#errorList li').addClass('not-valid');
    //For the purposes of this project I did not allow the form to submit
    event.preventDefault();

};




//***************TO DO LIST STILL*************
//append price label in a better fashion then hard coding id into sibling


