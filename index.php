<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
    <link rel="stylesheet" href="dist/notifications.css">
    <style>
        * {
            font-family: Lato;
        }
    </style>
</head>
<body>


<button id="test">test</button>

<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
<script src="dist/notifications.js"></script>
<script>
    $('button#test').on('click', function () {
        $.notification("Hello world", {
            type: 'danger',
            timeout: 555555
        });
    })
</script>
</body>
</html>