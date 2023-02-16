var rollno = "";


function getAllData() {

    studentList = JSON.parse(localStorage.getItem('studObject')) ?? [];

    var content = document.getElementById('tabledata');

    content.innerHTML = "";

    studentList.forEach(val => {

        content.innerHTML += `
        <tr>
            
            <td>${val.rollno}</td>
            <td>${val.fname}</td>
            <td>${val.lname}</td>
            <td>${val.address}</td>
            <td>${val.date}</td>
            <td>${val.contact}</td>
            <td>${val.gender}</td>
            <td>${val.email}</td>

            <td><button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModalCenteredit" onclick="updateData(${val.rollno})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square"
            viewBox="0 0 16 16">
            <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg></button></td>

            <td><button type='button' class="btn btn-sm btn-danger" onclick="deleteData(${val.rollno})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg></button></td>
            </tr>`
    });
}


document.querySelector('.submitdata').addEventListener('click', save)

function validateinsert() {

    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const address = document.getElementById('address').value;
    const date = document.getElementById('date').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;

    if (fname === "" || lname === "" || address === "" || date === "" || contact === "" || email === "") {

        return true;
    }
    else {
        return false;
    }
}

function validateupdate() {


    const fname = document.getElementById('studfname').value;
    const lname = document.getElementById('studlname').value;
    const address = document.getElementById('studaddress').value;
    const date = document.getElementById('studdate').value;
    const contact = document.getElementById('studcontact').value;
    const email = document.getElementById('studemail').value;

    if (fname === "" || lname === "" || address === "" || date === "" || contact === "" || email === "") {
        return true;
    }
    else {
        return false;
    }
}

function save() {

    if (!validateinsert()) {
        if (localStorage.getItem('studObject') == null) {
            var studArr = [];
            document.getElementById('rollno').setAttribute('value', 100);
        }
        else {
            studArr = JSON.parse(localStorage.getItem('studObject'));
            console.log(studArr[studArr.length - 1].rollno);
            let rollno = studArr[studArr.length - 1].rollno;
            document.getElementById('rollno').setAttribute('value', rollno);
        }

        const studetData = {
            rollno: Number(document.getElementById('rollno').value) + 1,
            fname: document.getElementById('fname').value,
            lname: document.getElementById('lname').value,
            address: document.getElementById('address').value,
            date: document.getElementById('date').value,
            contact: document.getElementById('contact').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            email: document.getElementById('email').value
        }


        studArr.push(studetData);
        localStorage.setItem("studObject", JSON.stringify(studArr));

        getAllData();
    }

}

function deleteData(rollno) {

    studArr = JSON.parse(localStorage.getItem('studObject'));

    const index = studArr.findIndex(i => i.rollno == rollno);

    if (index > -1) {
        studArr.splice(index, 1);
    }
    console.log(studArr);

    localStorage.setItem('studObject', JSON.stringify(studArr));

    window.location.href = "CrudOperation.html"

}

function updateData(rollno) {


    studArr = JSON.parse(localStorage.getItem('studObject')) ?? [];

    console.log(studArr);

    studArr.forEach(function (val) {

        if (val.rollno == rollno) {

            console.log(val.rollno);
            console.log(val.fname);

            document.getElementById('studrollno').value = val.rollno,
                document.getElementById('studfname').value = val.fname,
                document.getElementById('studlname').value = val.lname,
                document.getElementById('studaddress').value = val.address,
                document.getElementById('studdate').value = val.date,
                document.getElementById('studcontact').value = val.contact,
                document.getElementById('studemail').value = val.email

            if (val.gender == 'male') {
                document.getElementById('studmale').checked = true
            } else {

                document.getElementById('studfemale').checked = true
            }
        }
    })


}
document.querySelector('.editstudentdata').addEventListener('click', update)


function update() {


    if (!validateupdate()) {
        studupdateArr = JSON.parse(localStorage.getItem('studObject')) ?? [];

        studupdateArr.forEach(index => {
            if (document.getElementById('studrollno').value == index.rollno) {
                index.fname = document.getElementById('studfname').value,
                    index.lname = document.getElementById('studlname').value,
                    index.address = document.getElementById('studaddress').value,
                    index.date = document.getElementById('studdate').value,
                    index.contact = document.getElementById('studcontact').value,
                    index.gender = document.querySelector('input[name="gen"]:checked').value,
                    index.email = document.getElementById('studemail').value
            }
        })

        localStorage.setItem("studObject", JSON.stringify(studupdateArr));
        getAllData()
    }
}

function clearAllRecord() {

    if (localStorage.getItem('studObject') != null) {
        localStorage.clear();
    }
}
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();