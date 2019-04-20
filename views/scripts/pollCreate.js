$(document).ready(function () {
    $('#question-1').css('visibility', 'visible');
    
    //allows buttons to add or remove questions in the poll
    $('.button').click(function(event){
        switch ($(event.target).attr('id')) {
            case 'q2add':
                $('#question-2').css('visibility', 'visible')
                $('.button', '#question-1').hide()
                break
            
            case 'q2remove':
                $('#question-2').css('visibility', 'hidden')
                $('.button', '#question-1').show()
                break
            
            case 'q3add':
                $('#question-3').css('visibility', 'visible')
                $('.button', '#question-2').hide()
                break

            case 'q3remove':
                $('#question-3').css('visibility', 'hidden')
                $('.button', '#question-2').show()
                break

            case 'q4add':
                $('#question-4').css('visibility', 'visible')
                $('.button', '#question-3').hide()
                break

            case 'q4remove':
                $('#question-4').css('visibility', 'hidden')
                $('.button', '#question-3').show()
                break

            default:
                break
        }
    })

    //disables empty fields so they are not sent in the POST form
    $("#form").submit(function () {
        $(this).find(":input").filter(function () {
            return !this.value;
        }).attr("disabled", true)

        return true
    })
});