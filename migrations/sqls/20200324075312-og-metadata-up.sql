ALTER TABLE "script"
 ADD COLUMN meta_img_url varchar(1024),
 ADD COLUMN meta_img_width integer,
 ADD COLUMN meta_img_height integer,
 ADD COLUMN meta_title varchar(256),
 ADD COLUMN meta_description varchar(512);