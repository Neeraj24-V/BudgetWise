import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information and profile picture.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="User profile picture" data-ai-hint="person portrait" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                    <label htmlFor="picture" className="text-sm font-medium leading-none">Profile Picture</label>
                    <Input id="picture" type="file" className="max-w-xs" />
                    <p className="text-xs text-muted-foreground">Upload a new photo. PNG, JPG, GIF up to 10MB.</p>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <Button>Update Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <p>Toggle light or dark mode.</p>
                <ThemeToggle />
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Collaborative Budgeting</CardTitle>
              <CardDescription>Manage who you share your financial data with.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Jane Doe</p>
                        <p className="text-sm text-muted-foreground">jane.doe@example.com</p>
                    </div>
                    <Button variant="destructive">Remove</Button>
                </div>
                 <div className="space-y-2">
                    <label htmlFor="invite">Invite new member</label>
                    <div className="flex space-x-2">
                        <Input id="invite" type="email" placeholder="Enter email address" />
                        <Button>Send Invite</Button>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
