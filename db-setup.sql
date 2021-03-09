create database hacer; go
use hacer; go

create table test_table(test_table_id int, name nvarchar(max), age datetime2); go

insert into test_table(test_table_id, name, age) values(
    1, 'Name One', '2019/10/14'
); go