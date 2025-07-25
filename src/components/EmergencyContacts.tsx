import { useState } from "react";
import { Plus, Phone, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "", relationship: "" });
  const { toast } = useToast();

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: Contact = {
        id: Date.now().toString(),
        ...newContact
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: "", phone: "", relationship: "" });
      toast({
        title: "Emergency contact added",
        description: `${newContact.name} has been added to your emergency contacts.`,
      });
    }
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
    toast({
      title: "Contact removed",
      description: "Emergency contact has been removed.",
    });
  };

  const triggerEmergency = () => {
    if (contacts.length === 0) {
      toast({
        title: "No emergency contacts",
        description: "Please add emergency contacts first.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send SMS/calls to contacts
    toast({
      title: "Emergency alert sent!",
      description: `Emergency notifications sent to ${contacts.length} contact(s).`,
      variant: "destructive"
    });
  };

  return (
    <div className="flex gap-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Phone className="h-4 w-4" />
            {contacts.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {contacts.length}
              </span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Emergency Contacts</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Contact name"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              />
              <Input
                placeholder="Phone number"
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              />
              <Input
                placeholder="Relationship (e.g., Parent, Friend)"
                value={newContact.relationship}
                onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
              />
              <Button onClick={addContact} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </div>

            {contacts.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Your Emergency Contacts:</h4>
                {contacts.map((contact) => (
                  <Card key={contact.id} className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.phone}</p>
                        {contact.relationship && (
                          <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeContact(contact.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Button 
        variant="destructive" 
        size="icon" 
        onClick={triggerEmergency}
        className="animate-pulse"
        title="Emergency Alert"
      >
        <AlertTriangle className="h-4 w-4" />
      </Button>
    </div>
  );
};