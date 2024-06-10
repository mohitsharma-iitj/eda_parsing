CREATE DATABASE edi_db;

USE edi_db;
drop table edi_table;
CREATE TABLE edi_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    segment_type VARCHAR(255),
    segment_data TEXT
);

insert into edi_table (segment_type,segment_data)
values 
('string' , "mohit sharma "),
('char' , "M O H I T  S H A r M  "),
('officw' , "diggaj coder ");


select * from edi_data;
select * from edi_table;