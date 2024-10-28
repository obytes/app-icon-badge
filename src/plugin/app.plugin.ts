/**
 * even that generating the icon with the badge is an async operation, which means we need to run it with a dangerous mod,
 * we end up using a sync version of the function in the plugin as stops working when we use the async function
 */

import { withIconBadge } from './with-icon-badge';

module.exports = withIconBadge;
