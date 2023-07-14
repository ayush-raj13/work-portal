@ECHO OFF
echo Enter no. of dummy Recruiter.
set /p input= Type any input :- 
FOR /l %%i IN (1 1 %input%) do (
    CALL npm run dummyrecruiter
    timeout /t 3
    echo %%i
)
echo Complete!
pause
