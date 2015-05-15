@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\jstransform\bin\jstransform" %*
) ELSE (
  node  "%~dp0\..\jstransform\bin\jstransform" %*
)