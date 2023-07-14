@ECHO OFF
echo Enter no. of dummy Job Applicant.
set /p input= Type any input :- 
FOR /l %%i IN (1 1 %input%) do (
    CALL npm run dummyapplicant
    timeout /t 3
    echo %%i
)
echo Complete!
pause
