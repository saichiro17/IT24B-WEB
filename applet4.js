class StudentList {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.students = [];
        this.init();
    }

    async init() {
        await this.fetchData();
        this.renderStudentList(this.students); 
        this.bindSearchEvent();
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            this.students = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    renderStudentList(students, containerId = 'studentList') {
        const studentListContainer = document.getElementById(containerId);
        studentListContainer.innerHTML = students.map(student => 
            `<button class="btn btn-primary" style="margin-top:15px; width:25rem">
                ${student.student_name} | ${student.student_program}
            </button><br>`
        ).join('');
    }

    bindSearchEvent() {
        const studentSearchBar = document.getElementById('studentSearchBar');
        const studentSearchListContainer = document.getElementById('studentSearchList');

        studentSearchBar.addEventListener('input', () => {
            this.filterStudents(studentSearchBar.value, studentSearchListContainer);
        });
    }

    filterStudents(query, searchListContainer) {
        const filteredStudents = this.students.filter(student => {
            const fullName = `${student.student_name} ${student.student_program}`;
            return fullName.toLowerCase().includes(query.toLowerCase());
        });

        this.renderStudentList(filteredStudents, 'studentSearchList');
    }
}

const studentList = new StudentList('applet4.json')
