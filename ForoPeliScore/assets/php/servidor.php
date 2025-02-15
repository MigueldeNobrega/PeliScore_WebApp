<?php
require_once("BBDD_CTRLR.php");

if (isset($_REQUEST['peticion'])) {
    switch ($_REQUEST['peticion']) { 

      
       case "Login":
            // Recuperar el alias de la url
            $alias = $_REQUEST['alias'];
            // Recuperar el password de la url
            $password = $_REQUEST['password'];
            $sql = "CALL usuario_Login('$alias', '$password')";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::Consultas($sql,'');    
            echo json_encode($datos);      
            break;  


        case "Registro":
             $nombre = $_REQUEST['nombre'];
             $alias = $_REQUEST['alias'];
             $pas = $_REQUEST['pas'];
             $sql = "CALL usuarios_Insertar('$nombre','$alias', '$pas')";
             $datos['sql']=$sql;
             $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');    
             echo json_encode($datos);      
             break;


             case "Invitado":
               $sql = "SELECT * from usuarios where usu_id='24'";
               $datos['sql']=$sql;
               $datos['datos'] = BBDD_CTRLR::Consultas($sql);
               echo json_encode($datos);      
               break;  


             case "CargarTemas":
                $sql = "SELECT * from foros order by for_tema";
                $datos = BBDD_CTRLR::Consultas($sql);
                echo json_encode($datos);      
                break;  


                 case "CargarMensajes":
                    $for_id=$_REQUEST['for_id'];
                    $sql = "SELECT Distinct fu.*, usu.usu_foto, usu.usu_alias, usu.usu_nombre
                    FROM foros_usuarios as fu, foros as fo, usuarios as usu
                    WHERE usu.usu_id=fu.fu_usu_id AND  (fu.fu_for_id='$for_id')
                    order by fu_fecha DESC";
                    $datos = BBDD_CTRLR::Consultas($sql);
                    echo json_encode($datos);      
                    break;


                    case "AñadirTema":
                     $tema=$_REQUEST['tema'];
                     $sql = "CALL foro_Insertar('$tema')";
                     $datos['sql']=$sql;
                     $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
                     echo json_encode($datos);      
                     break; 


                     case "BorrarTema":
                        $for_id=$_REQUEST['for_id'];
                        $sql = "DELETE FROM foros where (for_id='$for_id')";
                        $datos['sql']=$sql;
                        $datos ['datos'] = BBDD_CTRLR::CRUD($sql,'i');
                        echo json_encode($datos);      
                        break;


                        case "AñadirMensaje":
                           $mensaje=$_REQUEST['mensaje'];
                           $fu_for_id=$_REQUEST['fu_for_id'];
                           $fu_usu_id=$_REQUEST['fu_usu_id'];
                           $sql = "CALL mensaje_Insertar('$fu_usu_id','$fu_for_id','$mensaje')";
                           $datos['sql']=$sql;
                           $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
                           echo json_encode($datos);      
                           break; 


                           case "BorrarMensaje":
                              $fu_id=$_REQUEST['fu_id'];
                              $sql = "CALL mensaje_Borrar('$fu_id')";
                              $datos['sql']=$sql;
                              $datos ['datos'] = BBDD_CTRLR::CRUD($sql,'i');
                              echo json_encode($datos);      
                              break;
                           

                              case "CambiarFoto":
                                 $usu_id=$_REQUEST['usu_id'];
                                 $usu_foto=$_REQUEST['usu_foto'];
                                 $sql = "CALL foto_Actualizar('$usu_id','$usu_foto')";
                                 $datos['sql']=$sql;
                                 $datos ['datos'] = BBDD_CTRLR::CRUD($sql,'i');
                                 echo json_encode($datos);      
                                 break;


                               case "CargarPerfil":
                                  $usu_id=$_REQUEST['usu_id'];
                                  $sql = "SELECT usu.usu_foto, usu.usu_alias, usu.usu_nombre
                                  FROM usuarios as usu
                                  WHERE (usu.usu_id='$usu_id')";
                                    $datos = BBDD_CTRLR::Consultas($sql);
                                    echo json_encode($datos);      
                                    break;
 }
}     


