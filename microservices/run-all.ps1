$commands = @(
    "cd user-service; mvn clean install; java -jar .\target\user-service-0.0.1-SNAPSHOT.jar",
    "cd alert-service; mvn clean install; java -jar .\target\alert-service-0.0.1-SNAPSHOT.jar",
    "cd api-gateway; mvn clean install; java -jar .\target\api-gateway-0.0.1-SNAPSHOT.jar"
)

$powershellPath = (Get-Command powershell).Source

foreach ($command in $commands) {
    Start-Process $powershellPath -ArgumentList "-NoExit", "-Command", $command
}
