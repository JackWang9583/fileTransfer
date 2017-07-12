/**
 * Created by Administrator on 2017/3/15.
 */
var fw = angular.module('fw', ['ng', 'ngRoute']);
fw.config(function ($routeProvider) {
    $routeProvider
        .when('/fw_start', {
            templateUrl: 'tpl/start.html'
        })
        .when('/fw_main', {
            templateUrl: 'tpl/main.html'

        })
        .when('/fw_case', {
            templateUrl: 'tpl/case.html',
            controller: 'caseCtrl'
        })
        .when('/fw_game', {
            templateUrl: 'tpl/game.html',
            controller: 'gameCtrl'
        })
        .when('/fw_exp', {
            templateUrl: 'tpl/exp.html',
            controller: 'expCtrl'
        })
        .when('/fw_detail/:id', {
            templateUrl: 'tpl/detail.html',
            controller: 'detailCtrl'
        })
        .when('/fw_e_detail/:id', {
            templateUrl: 'tpl/e_detail.html',
            controller: 'e_detailCtrl'
        })
        .when('/fw_pinglun', {
            templateUrl: 'tpl/pinglun.html'
        })
        .when('/fw_order', {
            templateUrl: 'tpl/order.html',
            controller: 'orderCtrl'
        })
        .when('/fw_cg',{
            templateUrl:'tpl/cg.html'
        })
        .when('/fw_sb',{
            templateUrl:'tpl/sb.html'
        })
        .when('/fw_fbcg',{
            templateUrl:'tpl/fbcg.html'
        })
        .otherwise({redirectTo: '/fw_start'})
})


/////////////////////////
//////main页面控制器//////
////////////////////////

fw.controller('mainCtrl', ['$scope', '$location', '$http', '$timeout', function ($scope, $location, $http, $timeout) {
    $scope.jump = function (url) {
        $location.path(url);
    }
    $scope.zz = function (e) {
        e.preventDefault();
    }
    $scope.tp = function () {

        //防止浏览器直接打开本地图片
        document.ondragover = function (e) {
            e.preventDefault();
        }
        document.ondrop = function (e) {
            e.preventDefault();
        }
        box.ondragover = function (e) {
            e.preventDefault();
        }
        box.ondrop = function (e) {
            console.log("有图片在这上面释放");
            var f0 = e.dataTransfer.files[0];
            console.dir(window.URL);
            var fr = new FileReader();
            fr.readAsDataURL(f0);
            if (box.innerHTML) {
                box.innerHTML = "";
            }
            fr.onload = function () {
                var img = new Image();
                img.src = fr.result;
                box.appendChild(img);
                document.querySelector('#box img').setAttribute("width", '100%');
                urls.value = fr.result;
            }
        }

    }
    $scope.text = [];
    $scope.yz = function () {
        $scope.text = [];
        var w = 150;
        var h = 34;
        var ctx = yan.getContext('2d');
        console.log(3333);
        var txt;

        //1.填充一个矩形，作为背景颜色
        ctx.fillStyle = rc(180, 230);
        ctx.fillRect(0, 0, w, h);
        //2.绘制5个随机文字
        var pool = 'qwertyuiopasdfghjklzxcvbnm3456789';
        for (var i = 0; i < 5; i++) {
            //生成一个随机字符
            txt = pool[rn(0, pool.length)];
            $scope.text += txt;
            var fontSize = rn(30, 40);//字体大小
            ctx.font = fontSize + 'px SimHei';
            var color = rc(80, 180);//字体颜色
            ctx.fillStyle = color;
            ctx.textBaseline = 'top'; //文本基线

            ctx.save(); //保存画笔的当前状态：无旋转/无平移
            ctx.translate(30 * i + 30 / 2, 30 / 2);
            ctx.rotate(rn(-45, 45) * Math.PI / 180);
            var x = -fontSize / 2;
            var y = -fontSize / 2;
            ctx.fillText(txt, x, y);  //绘制文本
            ctx.restore(); //恢复画笔状态到最近一次保存的效果
        }
        //3.绘制6条干扰直线
        for (var i = 0; i < 6; i++) {
            ctx.beginPath();
            var x1 = rn(0, w);
            var y1 = rn(0, h);
            ctx.moveTo(x1, y1);
            var x2 = rn(0, w);
            var y2 = rn(0, h);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = rc(0, 255);
            ctx.stroke();  //对直线路径进行描边
        }

        //4.绘制30个干扰点——半径为1的圆形路径
        for (var i = 0; i < 50; i++) {
            ctx.beginPath();
            var x = rn(0, w);
            var y = rn(0, h);
            ctx.arc(x, y, 1, 0, 2 * Math.PI);

            ctx.fillStyle = rc(0, 255);
            ctx.fill(); //填充圆形路径
        }
        /*random number：返回指定范围内的随机整数*/
        function rn(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        /*random color：返回指定范围内的随机颜色*/
        function rc(min, max) {
            var r = Math.floor(Math.random() * (max - min) + min);
            var g = Math.floor(Math.random() * (max - min) + min);
            var b = Math.floor(Math.random() * (max - min) + min);
            return `rgb(${r}, ${g}, ${b})`;
        }

        console.log($scope.text);
    };
    $scope.top_dl = "active";
    $scope.top_zc = "";
    $scope.denglu = function () {
        $scope.pd = 5;
    }
    $scope.zhuce = function () {
        $scope.top_dl = "";
        $scope.top_zc = "active";
        $scope.panduan = 5;
    };

    $scope.zc = function () {
        $scope.name = uname.value;
        $scope.upwd = upwd.value;
        $scope.upwds = upwds.value;
        $scope.photo = urls.value;
        $scope.uyz = uyz.value;
        box.innerHTML = "";
        if ($scope.uyz == $scope.text) {
            if ($scope.upwd == $scope.upwds) {
                $http({
                    method: 'post',
                    url: 'data/user_add.php',
                    params: {'pwd': $scope.upwd, 'name': $scope.name, 'photo': $scope.photo}
                })
                    .success(function (data) {
                        if (data == 1) {
                            $scope.panduan = 1;
                            $timeout(function () {
                                $scope.top_zc = "";
                                $scope.top_dl = "active";
                                $scope.panduan = 5;
                                $scope.text = "";
                            }, 500)
                        } else if (data == 0) {
                            $scope.panduan = 0;
                        } else if (data == 2) {
                            $scope.panduan = 2;
                        }
                    }
                )
            } else {
                $scope.panduan = -1;
            }
        } else {
            $scope.panduan = 3;
        }
    };
    $scope.modal = 1;
    $scope.nav_hy = 0;
    $scope.nav_dl = function () {
        $scope.modal = 1;
        $scope.top_zc = "";
        $scope.top_dl = "active";

    };
    $scope.nav_zc = function () {
        $scope.modal = 1;
        $scope.top_dl = "";
        $scope.top_zc = "active";

    };
    $scope.dl = function () {
        $scope.gname = gname.value;
        $scope.gpwd = gpwd.value;

        $http({
            method: 'post',
            url: 'data/login.php',
            params: {'pwd': $scope.gpwd, 'name': $scope.gname}
        })
            .success(function (data) {
                if (data[0] != null) {
                    $scope.pd = 1;
                    $timeout(function () {
                        document.querySelector(".modal-backdrop.fade.in").style.display = "none";
                        document.querySelector("body").style.overflow = 'scroll';
                        $scope.modal = 0;
                        $scope.nav_hy = 1;
                        $scope.pd = 5;
                        $scope.user_id = data[0];
                    }, 500)
                } else {
                    $scope.pd = 0;
                }
            })
    }
    $scope.zx = function () {
        $scope.nav_hy = 0;
        $scope.user_id = null;
    }
    $scope.kw_m = 0;
    $scope.kw = function () {
        $scope.ukw = kw.value;
        if ($scope.ukw != "")
            $http({
                method: 'post',
                url: 'data/kw.php',
                params: {'kw': $scope.ukw}
            }).success(function (data) {
                if (data != "") {
                    $scope.kw_m = 1;
                    $scope.hf = data;
                    console.log($scope.hf);
                } else {
                    alert("没有您所需要的服务")
                }
            })
    }
    $scope.kw_modal = function () {
        $scope.kw_m = 0;
    }
    $http
        .get('data/case_getbypage.php')
        .success(function (data) {
            //console.log(data);
            $scope.c_dishList = data;
        })
    $http
        .get('data/game_getbypage.php')
        .success(function (data) {
            //console.log(data);
            $scope.g_dishList = data;
        })
    $http
        .get('data/exp_getbypage.php')
        .success(function (data) {
            //console.log(data);
            $scope.e_dishList = data;
        })
    $scope.fb = function () {
        $scope.g_content = fb.value;
        console.log($scope.g_content);
        if ($scope.g_content != "") {
            $http({
                method: 'post',
                url: 'data/exp_add.php',
                params: {'user_id': $scope.user_id, 'g_content': $scope.g_content}
            }).success(function (data) {
                if (data == 1) {
                    $location.path('/fw_fbcg');
                }
            })
        } else {
            alert('评论内容不能为空');
        }
    }
}]);
fw.controller('detailCtrl', ['$scope', '$routeParams', '$http','$location',
    function ($scope, $routeParams, $http,$location) {
        console.log($routeParams.id);
        $http({
            method: 'post',
            url: 'data/case_by.php',
            params: {'id': $routeParams.id}
        })
            .success(function (data) {
                console.log(data);
                $scope.dish = data[0];
            }).error(function () {
                alert("没有获取到PHP")
            })
        $scope.tj = function () {
            $http({
                method:'post',
                url:'data/order_add.php',
                params:{'case_id':$routeParams.id,'user_id':$scope.user_id}
            })
                .success(function(data){
                    if(data==1){
                        $location.path('/fw_cg');
                    }else{
                        $location.path('/fw_sb');
                    }
                })
        }
    }])
fw.controller('e_detailCtrl', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        console.log($routeParams.id);
        $http({
            method: 'post',
            url: 'data/exp_by.php',
            params: {'id': $routeParams.id}
        })
            .success(function (data) {
                console.log(data);
                $scope.dish = data[0];
            }).error(function () {
                alert("没有获取到PHP")
            })
    }
])
fw.controller('caseCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.loadMore = true;
        $scope.ym = 1;
        $http({
            method: 'post',
            url: 'data/case_getbypage.php'
        })
            .success(function (data) {
                console.log(data);
                $scope.c_dish = data;
            }).error(function () {
                alert("没有获取到PHP")
            })
        $scope.loadMore = function () {
            $http
                .get('data/case_getbypage.php?start=' + $scope.c_dish.length)
                .success(function (data) {
                    console.log(data);
                    if (data.length < 3) {
                        $scope.hasMore = false;
                    } else if (data.length == 0) {
                        $scope.ym = 0;
                    }
                    $scope.c_dish = $scope.c_dish.concat(data);
                    console.log($scope.c_dish);

                })
        }
    }])
fw.controller('gameCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.loadMore = true;
        $http({
            method: 'post',
            url: 'data/game_getbypage.php'
        })
            .success(function (data) {
                console.log(data);
                $scope.g_dish = data;
            }).error(function () {
                alert("没有获取到PHP")
            })
        $scope.loadMore = function () {
            $http
                .get('data/game_getbypage.php?start=' + $scope.g_dish.length)
                .success(function (data) {
                    console.log(data);
                    if (data.length < 3) {
                        $scope.hasMore = false;
                    }
                    $scope.g_dish = $scope.g_dish.concat(data);
                    console.log($scope.g_dish);

                })
        }
    }])
fw.controller('expCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.loadMore = true;
        $http({
            method: 'post',
            url: 'data/exp_getbypage.php'
        })
            .success(function (data) {
                console.log(data);
                $scope.e_dish = data;
            }).error(function () {
                alert("没有获取到PHP")
            })
        $scope.loadMore = function () {
            $http
                .get('data/exp_getbypage.php?start=' + $scope.e_dish.length)
                .success(function (data) {
                    console.log(data);
                    if (data.length < 3) {
                        $scope.hasMore = false;
                    }
                    $scope.e_dish = $scope.e_dish.concat(data);
                    console.log($scope.e_dish);
                })
        }
    }]);
fw.controller('orderCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http({
            method: 'post',
            url: 'data/order.php',
            params: {'user_id': $scope.user_id}
        }).success(function (data) {
            $scope.o_dish = data;
        })
        $scope.loadMore = function () {
            $http({
                method: "post",
                url: 'data/order.php',
                params: {'user_id':$scope.user_id,'start': $scope.o_dish.length}
            }).success(function (data) {
                $scope.o_dish = $scope.o_dish.concat(data);
            })
        }
    }])