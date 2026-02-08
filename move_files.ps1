Get-ChildItem -Path "app" | Move-Item -Destination . -Force
Remove-Item -Path "app" -Force
