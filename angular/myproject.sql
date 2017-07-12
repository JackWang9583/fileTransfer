set names utf8;
drop database if exists wmfw;
create database wmfw charset=utf8;
use wmfw;

create table t_user(
uid int primary key auto_increment,
uname varchar(16),
upwd varchar(16),
uphoto varchar(20000)
);
insert into t_user values(null,'xf','123123','img/user_1.jpg');
insert into t_user values(null,'周冬雨','123123','img/user_2.jpg');
insert into t_user values(null,'刘强东','123123','img/user_3.jpg');
insert into t_user values(null,'奶茶妹','123123','img/user_4.jpg');
insert into t_user values(null,'刘亦菲','123123','img/user_5.jpg');
insert into t_user values(null,'汤唯','123123','img/user_6.jpg');
insert into t_user values(null,'刘德华','123123','img/user_7.jpg');
insert into t_user values(null,'李易峰','123123','img/user_8.jpg');
insert into t_user values(null,'林俊杰','123123','img/user_9.jpg');


create table t_case(
aid int primary key auto_increment,
aphoto varchar(64),
caption varchar(25),
acontent varchar(255),
price double(10,2),
aclass int
);
insert into t_case values(null,"anli1.jpg","希望朋友觉得你每天精彩","无聊的周末，还是枯燥的上班都能让你的生活变得interesting",100,1);
insert into t_case values(null,"anli2.jpg","想给前任展现充实的你","可租赁几名工作人员假装几对情侣旅游约会",180,1);
insert into t_case values(null,"anli3.jpg","假扮观众让你的演出看起来人气火爆","dsadasdsa",60,1);
insert into t_case values(null,"anli4.jpg","假扮食客使你的餐馆看起来更吸引人","dsadasdsa",40,1);
insert into t_case values(null,"anli5.jpg","大会代理出席","假扮应聘者、听众出席你的企业招聘会、新品发布会、营造高大上感",200,1);
insert into t_case values(null,"anli6.jpg","谢罪代行","假扮成你的上司、父母,代替你向客户、邻居道歉等",300,1);
insert into t_case values(null,"anli7.jpg","防尴尬出行","带你去迪士尼、陪你唱K、看电影吃火锅,陪你去各种很难一个人去完成的项目",280,1);
insert into t_case values(null,"anli8.jpg","租赁父母","如您与父母断绝关系、或有事相瞒,可为您提供假扮父母服务",150,1);
insert into t_case values(null,"anli9.jpg","租赁闺蜜","陪你逛街聊天陪发恼骚、也可帮你试探男友忠诚度",180,1);
insert into t_case values(null,"anli10.jpg","租赁男友","年龄、相貌皆可按您的要求定制、或向父母交差、或向前任、朋友显摆、或您自己解闷",320,1);
insert into t_case values(null,"anli11.jpg","dnf代练满级","陪你逛街聊天陪发恼骚、也可帮你试探男友忠诚度",200,2);
insert into t_case values(null,"anli12.jpg","lol代练满级","陪你逛街聊天陪发恼骚、也可帮你试探男友忠诚度",50,2);
insert into t_case values(null,"anli13.jpg","dnf代刷深渊","陪你逛街聊天陪发恼骚、也可帮你试探男友忠诚度",30,2);
insert into t_case values(null,"anli14.jpg","英雄联盟代练上分","陪你逛街聊天陪发恼骚、也可帮你试探男友忠诚度",200,2);
insert into t_case values(null,"anli15.jpg","守望先锋刷箱子","陪你逛街聊天陪发恼骚、也可帮你试探男友忠诚度",200,2);
insert into t_case values(null,"anli16.jpg","守望先锋冲分","助你跳出鱼塘",200,2);
insert into t_case values(null,"anli17.jpg","dnf代练满级","陪你逛街聊天陪发恼骚、也可帮你试探男友忠诚度",200,2);


create table t_exp(
gid int primary key auto_increment,
user_id int,
dateline date,
g_content varchar(255)
);
insert into t_exp values(null,2,'2015-10-10 12:00:00','请了10名工作人员假扮我的朋友,在酒店为我举办了生日趴 ,还准备了惊喜礼物。最后我发到脸书和推特的照片都很棒。');
insert into t_exp values(null,6 ,'2015-10-10 12:00:00','请了5名工作人员，和我一起假装3对情侣去海边周末,女生都很萌男生都很帅,发ins后很多人点赞');
insert into t_exp values(null,7 ,'2015-10-10 12:00:00','请了5名工作人员，和我一起假装3对情侣去海边周末,女生都很萌男生都很帅,发ins后很多人点赞');
insert into t_exp values(null,8 ,'2015-10-10 12:00:00','请了5名工作人员，和我一起假装3对情侣去海边周末,女生都很萌男生都很帅,发ins后很多人点赞');

create table t_order(
oid int primary key auto_increment,
user_id int,
o_dateline date,
case_id int
);
insert into t_order values(null,2,'2015-10-10 12:00:00',5);
insert into t_order values(null,2,'2015-10-10 12:00:00',1);
insert into t_order values(null,2,'2015-10-10 12:00:00',3);
insert into t_order values(null,2,'2015-10-10 12:00:00',14);


SAE_MYSQL_HOST_M,SAE_MYSQL_USER,SAE_MYSQL_PASS,SAE_MYSQL_BD,SAE_MYSQL_PORT

