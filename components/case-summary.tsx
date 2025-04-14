import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface CaseSummaryProps {
  caseId: string
}

export function CaseSummary({ caseId }: CaseSummaryProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Case Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium">Description</h3>
              <p className="text-sm text-muted-foreground">
                Multiple failed login attempts were detected from IP address 192.168.1.100 targeting the admin account.
                The IP is not associated with any known company locations or VPNs. After 5 failed attempts, a successful
                login was recorded, followed by attempts to access sensitive customer data.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium">Involved Assets</h3>
              <ul className="list-inside list-disc text-sm text-muted-foreground">
                <li>Admin Portal (admin.company.com)</li>
                <li>User: admin@company.com</li>
                <li>Database: customer_records</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-medium">Incident Type</h3>
              <p className="text-sm text-muted-foreground">Unauthorized Access / Potential Account Compromise</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[120px] resize-none"
            readOnly
            value="Based on the observed events, this appears to be a targeted brute force attack followed by a successful compromise of the admin account. The attacker used a non-company IP address (192.168.1.100) and attempted to access sensitive customer records after gaining access. Recommend immediate password reset, enabling MFA for the admin account, and blocking the source IP address while investigation continues."
          />
        </CardContent>
      </Card>
    </div>
  )
}
