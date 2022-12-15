
  
var tableData = {
    Faculty: {
        columns: [
            { title: 'ID', field: 'fac_id', type:'numeric' },
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' },
            { title: 'Subject', field: 'subject' },
            { title: 'Phone Number', field: 'phonenumber', type: 'numeric' },
          ],
          data: [
            { id:1, name: 'Kishore',email:'abc@123.com', subject:'Maths', phonenumber:9988776655 },
            { id:2, name: 'Sita',email:'efgh@567.com', subject:'DBMS', phonenumber:9456676655 }
          ]
    },
    Student: {
      columns: [
        { title: 'Student ID', field: 'student_id', type:'numeric' },
        { title: 'Name', field: 'name' },
        { title: 'Email', field: 'email' },
        { title: 'section', field: 'section' },
        { title: 'Semester', field: 'semester', type: 'numeric' },
        { title: 'Branch', field: 'branch' }
      ],
      data: [
      ]
    },
    Department: {
      columns: [
        { title: 'Department ID', field: 'DEP_id', type:'numeric' },
        { title: 'Department Name', field: 'NAME' }
      ],
      data: [
      ]
    },
    Faculty_Replacement: {
      columns: [
        { title: 'Replacement No', field: 'replacement_no', type:'numeric' },
        { title: 'Old ID', field: 'old_id', type:'numeric' },
        { title: 'New ID', field: 'new_id', type:'numeric' },
        { title: 'From Date', field: 'from_date', type: 'date' },
        { title: 'TO date', field: 'to_date', type: 'date' }
      ],
      data: [
      ]
    },
    Lab: {
      columns: [
        { title: 'Lab Code', field: 'LAB_CODE' },
        { title: 'Credits', field: 'CREDITS', type:'numeric' },
        { title: 'Department', field: 'DEPARTMENT'},
        { title: 'Faculty', field: 'FACULTY' }
      ],
      data: [
      ]
    },
    Course: {
      columns: [
        { title: 'Course Code', field: 'COURSE_CODE' },
        { title: 'Course Name', field: 'COURSE_NAME' },
        { title: 'Course Credits', field: 'COURSE_CREDITS', type: 'numeric' },
        { title: 'Department', field: 'dept'}
      ],
      data: [
      ]
    },
    // Class: {
    //   columns: [
    //     { title: 'Room No', field: 'room_no', type:'numeric' },
    //     { title: 'Department ID', field: 'dep_id', type:'numeric' },
    //     { title: 'Batch', field: 'batch' },
    //     { title: 'Section', field: 'section' }
    //   ],
    //   data: [
    //   ]
    // },
    Time_table: {
      columns: [
        { title: 'Day', field: 'day' },
        { title: 'Slot', field: 'slot', type:'numeric' },
        { title: 'Department', field: 'dept_name' },
        { title: 'Subject', field: 'course_name' },
        { title: 'Section', field: 'SECTION' },
        { title: 'Semester', field: 'semester'}
      ],
      data: [
      ]
    },
    
};

module.exports  = tableData;