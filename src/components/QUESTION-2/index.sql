/*As per the Question number 2 in the Assignment, This is the code in SQL: */

SELECT
  customers.customerId,
  customers.name,
  GROUP_CONCAT(subjects.subjectName ORDER BY subjects.subjectName SEPARATOR ', ') AS subjects
FROM
  customers
  JOIN subject_student_mapping ON customers.customerId = subject_student_mapping.customerId
  JOIN subjects ON subject_student_mapping.subjectId = subjects.subjectId
GROUP BY
  customers.customerId, customers.name;
