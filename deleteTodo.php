<?php
  #nice
  $title = $_GET['title'];
  echo("Received item to delete ".$title."\n");
  //open and load JSON file
  $jsonString = file_get_contents('todo.json');
  $data = json_decode($jsonString,true);
  echo("Loaded data length ".sizeof($data.length)."\n");
  for($i=0;$i<sizeof($data);$i++){
    echo("Checking position".$i."\n");
    if($data[$i]['title']==$title) {
      echo("Found\n");
      for($i;$i<sizeof($data)-1;$i++){
        $data[$i]['title']=$data[$i+1]['title'];
      }
      array_splice($data,sizeof($data)-1);
    } else {
      echo("Did not find item \n");
    }
  }
  $newJsonString = json_encode($data);
  echo("New JSON file: ".$newJsonString."\n");
  file_put_contents('todo.json', $newJsonString);
?>
