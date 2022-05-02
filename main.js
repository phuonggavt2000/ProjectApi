
var courseApi = "http://localhost:3000/courses"

function start() {
    getCourses(function (courses) { // 1. sử lý lấy ra Javascript Types
        renderCourses(courses) // 2. Sử lý để hiện thị lên web
    }) // Tham số trong getCourses là callback

    createForm() //3. Tạo dữ liệu mới
}

start()

// function
function getCourses(callback) { // Dùng để get ra JSON và chuyển về Javascripts Types
    fetch(courseApi)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}


function renderCourses(courses) { // sử lý để hiện lên web
    var listCourses = document.querySelector(".listCourse")
    var htmls = courses.map(function (courses) {
        return `<li class="contain-course-${courses.id}"> 
        <h3> ${courses.name} </h3> 
        <p> ${courses.description} </p>
        <button onclick="handleDeleteCourse(${courses.id})"> Xóa </button>
        <button onclick="putCourse(${courses.id})"> Sửa </button>
        </li>
        `
    })
    listCourses.innerHTML = htmls.join("")
}


function handleCreateCourses(data, callback) { // Sử lý để chuyển data thành JSON và thêm vào API
    var option = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // data là giữ liệu của formData
    };
    fetch(courseApi, option) // đối số 2 options là gửi dữ liệu đi
    setTimeout(() => {
        getCourses(function (courses) {
            renderCourses(courses)
        })
    }, 1000);

}



function createForm() {
    var createBtn = document.querySelector("#create")

    createBtn.onclick = function (e) { // Khi click sẽ lấy ra tạo ra data
        var name = document.querySelector("input[name='name']").value
        var description = document.querySelector('input[name="description"]').value
        var formData = {
            name: name,
            description: description
        }
        handleCreateCourses(formData) // Dữ liệu 
    }
}



function handleDeleteCourse(id) { // Sử lý Xóa dữ liệu
    var option = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(courseApi + `/${id}`, option)
    var containCourse = document.querySelector(`.contain-course-${id}`)
    containCourse.remove()
}


function putCourse(id) {
    var name = document.querySelector(".contain-course-" + id + " h3").innerText
    var title = document.querySelector(".contain-course-" + id + " p").innerText
    var containInput = document.querySelector('.contain-input')
    containInput.innerHTML = `
        <div>
            <label for="">Name</label>
            <input value="${name}" type="text" name="name">
        </div>
        <div>
            <label for="">Description</label>
            <input value="${title}" type="text" name="description">
        </div>
        <div>
            <button onclick="handleCourse(${id})">Sủa</button>
        </div>
    `
    
}

function handleCourse(id) {
    var valueName = document.querySelector("input[name='name']").value
    var valueDescription = document.querySelector("input[name='description']").value
    var course = {
        name: valueName,
        description: valueDescription
    }
    var option = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
    }
    fetch(courseApi + `/${id}`, option)
}
