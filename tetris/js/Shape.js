/**
 * 专门描述格子和图形的数据结构和功能
 */
//定义Cell类型描述一个格子: r,c,src
function Cell(r,c,src){
	this.r=r; this.c=c; this.src=src;
}
/*定义所有图形的公共父类型Shape:
	    所有图形都有一个格子数组，包含四个格子
      所有图形都可下落，左移，右移，旋转...
*/
function Shape(r0,c0,r1,c1,r2,c2,r3,c3,src,states,orgi){
	this.cells=[
		new Cell(r0,c0,src),	 new Cell(r1,c1,src),	
		new Cell(r2,c2,src),	 new Cell(r3,c3,src),	
	];
	this.states=states;//保存图形的多个旋转状态
	//根据参照格的下标，获得参照格对象
	this.orgCell=this.cells[orgi];
	this.statei=0;//保存图形所处的当前状态序号
}
Shape.prototype={//重定义Shape的原型对象
	moveDown(){//图形下落: 
		//遍历当前图形的cells中每个cell
		for(var i=0;i<this.cells.length;i++)
			this.cells[i].r++;//当前cell的r+1
	},
	moveLeft(){//图形左移
		//遍历当前图形的cells中每个cell
		for(var i=0;i<this.cells.length;i++)
			this.cells[i].c--;	//当前cell的c-1
	},
	moveRight(){//图形右移
		//遍历当前图形的cells中每个cell
		for(var i=0;i<this.cells.length;i++)
			this.cells[i].c++;	//当前cell的c+1
	},
	rotateR(){//顺时针旋转
		this.statei++;//将statei+1
		//如果statei等于states的元素个数,就改回0
		if(this.statei==this.states.length)
			this.statei=0;
		this.rotate();//旋转
	},
	rotate(){
		//获得state中statei位置的状态对象
		var state=this.states[this.statei];
		//遍历当前图形的cells中每个cell
		for(var i=0;i<this.cells.length;i++){
			var cell=this.cells[i];//临时保存cell
			//如果cell不是orgCell
			if(cell!=this.orgCell){
				//       r0c0 r1c1  r2c2 r3c3
				//state:{-1,0, 0,0, +1,0, 0,-1}
				//i=0
				//用orgCell的r加上state中对应位置的值，计算出cell的新r
				cell.r=this.orgCell.r+state["r"+i];
				//用orgCell的c加上state中对应位置的值，计算出cell的新c
				cell.c=this.orgCell.c+state["c"+i];
			}
		}
	},
	rotateL(){//逆时针旋转
		this.statei--;//将statei-1
		//如果statei等于-1,就改回states的元素个数-1
		if(this.statei==-1) 
			this.statei=this.states.length-1;
		this.rotate();//旋转
	}
}
//定义类型State,描述一种旋转状态: 
function State(r0,c0,r1,c1,r2,c2,r3,c3){
	this.r0=r0; this.c0=c0;
	this.r1=r1; this.c1=c1;
	this.r2=r2; this.c2=c2;
	this.r3=r3; this.c3=c3;
}
/*为每种图形定义专门的类型:
    子类型的构造函数中借用Shape构造函数，传入每个格子的坐标和图片路径
		子类型的原型要继承Shape的原型
*/
function T(){
	Shape.call(this,
		0,3,0,4,0,5,1,4,
		"img/T.png",
		[
			new State(0,-1, 0,0, 0,+1, +1,0),
			new State(-1,0, 0,0, +1,0, 0,-1),
		  new State(0,+1, 0,0, 0,-1, -1,0),
		  new State(+1,0, 0,0, -1,0, 0,+1)
		],
		1)
}
Object.setPrototypeOf(T.prototype,Shape.prototype);
function I(){
	Shape.call(this,
		0,3,0,4,0,5,0,6,
		"img/I.png",
		[
			new State(0,-1, 0,0, 0,+1, 0,+2),
			new State(-1,0, 0,0, +1,0, +2,0),
		],
		1)
}
Object.setPrototypeOf(I.prototype,Shape.prototype);
function O(){
	Shape.call(this,
		0,4,0,5,1,4,1,5,
		"img/O.png",
		[new State(0,-1, 0,0, +1,-1, +1,0)],
		1)
}
Object.setPrototypeOf(O.prototype,Shape.prototype);

//20分钟练习
/*
	S  04 05 13 14  orgi:3   2个状态
	Z  03,04,14,15  orgi:2   2个状态
	L  03,04,05,13  orgi:1   4个状态
	J  03,04,05,15  orgi:1   4个状态
*/
function S(){
	Shape.call(this,
		0,4,0,5,1,3,1,4,
		"img/S.png",
		[
			new State(-1,0, -1,+1, 0,-1, 0,0),
			new State(0,+1, +1,+1, -1,0, 0,0),
		],
		3)
}
Object.setPrototypeOf(S.prototype,Shape.prototype);
function Z(){
	Shape.call(this,
		0,3,0,4,1,4,1,5,
		"img/Z.png",
		[
			new State(-1,-1, -1,0, 0,0, 0,+1),
			new State(-1,+1, 0,+1, 0,0, +1,0),
		],
		2)
}
Object.setPrototypeOf(Z.prototype,Shape.prototype);
function L(){
	Shape.call(this,
		0,3,0,4,0,5,1,3,
		"img/L.png",
		[
			new State(0,-1, 0,0, 0,+1, +1,-1),
			new State(-1,0, 0,0, +1,0, -1,-1),
		  new State(0,+1, 0,0, 0,-1, -1,+1),
		  new State(+1,0, 0,0, -1,0, +1,+1)
		],
		1)
}
Object.setPrototypeOf(L.prototype,Shape.prototype);
function J(){
	Shape.call(this,
		0,3,0,4,0,5,1,5,
		"img/J.png",
		[
			new State(0,-1, 0,0, 0,+1, +1,+1),
			new State(-1,0, 0,0, +1,0, +1,-1),
		  new State(0,+1, 0,0, 0,-1, -1,-1),
		  new State(+1,0, 0,0, -1,0, -1,+1)
		],
		1)
}
Object.setPrototypeOf(J.prototype,Shape.prototype);